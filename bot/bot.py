import asyncio
import math

from utils.logger import get_logger
from utils.logic import (
    filter_price_range,
    filter_valid_competitors,
    is_item_already_listed,
    skip_due_to_last_run,
)
from utils.supabase import (
    get_general_settings,
    get_item_settings,
    get_items,
    get_listings,
    get_price_ranges,
    get_supabase_client,
    insert_listings,
    insert_logs,
    update_listings,
    was_logged_recently,
)
from utils.waxpeer import create_listing, edit_listing_price, search_items


async def bot():
    """
    Main bot logic
    * runs indefinitely as a deamon service
    """
    logger = get_logger("bot")
    while True:
        supabase = await get_supabase_client()
        settings = await get_general_settings(supabase)
        for setting in settings:
            try:
                logs_to_create = []
                if not setting["waxpeer_key"] or await skip_due_to_last_run(
                    supabase, setting
                ):
                    continue
                active_items = await get_items(supabase, setting["user_id"])
                if len(active_items) == 0:
                    log = {
                        "user_id": setting["user_id"],
                        "name": "ShieldPeer",
                        "message": "No active items found",
                        "type": "caution",
                        "image": "/logo.jpg",
                    }
                    if not await was_logged_recently(
                        supabase, setting["user_id"], log["message"]
                    ):
                        await insert_logs(supabase, [log])
                    continue
                listings = await get_listings(supabase, setting["user_id"])
                price_ranges = await get_price_ranges(supabase, setting["user_id"])
                listings_to_update = []
                listings_to_create = []
                for item in active_items:
                    item_settings = await get_item_settings(
                        supabase, setting["user_id"], item["id"]
                    )
                    if item_settings is None:
                        valid_price_range = await filter_price_range(
                            price_ranges, item["price"] / 100
                        )
                        if valid_price_range is None:
                            log = {
                                "user_id": setting["user_id"],
                                "name": item["market_hash_name"],
                                "image": f"https://community.cloudflare.steamstatic.com/economy/image/{item['image']}",
                                "message": f"No valid price range found for item ::: {item['asset_id']}",
                                "type": "caution",
                            }
                            if not await was_logged_recently(
                                supabase, setting["user_id"], log["message"]
                            ):
                                logs_to_create.append(log)
                            continue
                        item_settings = {
                            **valid_price_range,
                            **setting,
                        }
                    base_price = item["price"]  # from price empire in cents
                    search_results = await search_items(
                        item["market_hash_name"], setting["waxpeer_key"]
                    )
                    new_price = 10000000000  # some unreasonably high number
                    valid_competitors, new_price = await filter_valid_competitors(
                        base_price,
                        search_results,
                        item_settings,
                    )
                    if not valid_competitors or len(valid_competitors) == 0:
                        when_no_one_to_undercut_list_at = item_settings[
                            "when_no_one_to_undercut_list_at"
                        ]
                        listing_price_max = item_settings[
                            "listing_price_max"
                        ]  # this is a percentage
                        listing_price_if_no_one_to_undercut = item_settings[
                            "listing_price_if_no_one_to_undercut"
                        ]  # this is a percentage
                        if when_no_one_to_undercut_list_at == "listing_price_max":
                            new_price = math.ceil(
                                (listing_price_max / 100) * base_price
                            )
                        else:
                            new_price = math.ceil(
                                (listing_price_if_no_one_to_undercut / 100) * base_price
                            )
                    is_item_listed, listing_to_update = await is_item_already_listed(
                        listings, item["id"]
                    )
                    if is_item_listed:
                        listings_to_update.append(
                            {
                                "id": listing_to_update,
                                "item_id": item["id"],
                                "asset_id": item["asset_id"],
                                "price": new_price,
                                "name": item["market_hash_name"],
                                "image": f"https://community.cloudflare.steamstatic.com/economy/image/{item['image']}",
                            }
                        )
                    else:
                        listings_to_create.append(
                            {
                                "user_id": setting["user_id"],
                                "asset_id": item["asset_id"],
                                "item_id": item["id"],
                                "price": new_price,
                                "name": item["market_hash_name"],
                                "image": f"https://community.cloudflare.steamstatic.com/economy/image/{item['image']}",
                            }
                        )
                if len(listings_to_create):
                    if setting["is_running"]:
                        await create_listing(
                            [
                                {
                                    "item_id": listing["asset_id"],
                                    "price": listing["price"] * 10,
                                }
                                for listing in listings_to_create
                            ],
                            setting["waxpeer_key"],
                        )
                        await insert_listings(
                            supabase,
                            [
                                {
                                    "user_id": listing["user_id"],
                                    "item_id": listing["item_id"],
                                    "price": listing["price"] / 100,
                                    "updated_at": "now()",
                                }
                                for listing in listings_to_create
                            ],
                        )
                    logs_to_create.extend(
                        [
                            {
                                "user_id": listing["user_id"],
                                "name": listing["name"],
                                "image": listing["image"],
                                "message": (
                                    f"New listing created for {listing['name']} at {listing['price']} cents"
                                    if setting["is_running"]
                                    else f"New listing would have been created for {listing['name']} at {listing['price']} cents if the bot was running"
                                ),
                                "type": "success",
                            }
                            for listing in listings_to_create
                        ]
                    )
                if len(listings_to_update):
                    if setting["is_running"]:
                        await edit_listing_price(
                            [
                                {
                                    "item_id": listing["asset_id"],
                                    "price": listing["price"] * 10,
                                }
                                for listing in listings_to_update
                            ],
                            setting["waxpeer_key"],
                        )
                        await update_listings(
                            supabase,
                            [
                                {
                                    "id": listing["id"],
                                    "price": listing["price"] / 100,
                                    "updated_at": "now()",
                                }
                                for listing in listings_to_update
                            ],
                        )
                    logs_to_create.extend(
                        [
                            {
                                "user_id": listing["user_id"],
                                "name": listing["name"],
                                "image": listing["image"],
                                "message": (
                                    f"Price updated for {listing['name']} to {listing['price']} cents"
                                    if setting["is_running"]
                                    else f"Price would have been updated for {listing['name']} to {listing['price']} cents if the bot was running"
                                ),
                                "type": "success",
                                "meta_data": {
                                    "listing_id": listing["id"],
                                },
                            }
                            for listing in listings_to_update
                        ]
                    )
                logs_to_create.append(
                    {
                        "user_id": setting["user_id"],
                        "name": "Waxpeer",
                        "message": "Bot iteration completed",
                        "type": "success",
                        "image": "/external/waxpeer.svg",
                    }
                )
                if len(logs_to_create):
                    await insert_logs(supabase, logs_to_create)
            except KeyError:
                logger.error(f"KeyError occurred in bot:", exc_info=True)
                continue
            except Exception as err:
                logger.error(f"Unknown error occurred in bot: {err}", exc_info=True)
                continue


if __name__ == "__main__":
    logger = get_logger("bot")
    try:
        logger.info("ShieldPeer Bot: service started")
        asyncio.run(bot())
    except KeyboardInterrupt:
        logger.info("ShieldPeer Bot: service stopped")
    except Exception as err:
        logger.error(f"ShieldPeer Bot:", exc_info=True)
    finally:
        logger.info("ShieldPeer Bot: service stopped")
