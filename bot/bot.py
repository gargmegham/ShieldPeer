import asyncio
import math
from datetime import datetime

from dotenv import load_dotenv

from utils.logger import get_logger
from utils.supabase import (
    get_general_settings,
    get_item_settings,
    get_items,
    get_last_waxpeer_log,
    get_listings,
    get_price_ranges,
    get_supabase_client,
    insert_listings,
    insert_logs,
    insert_unique_logs,
    is_item_in_my_inventory,
    update_listings,
)
from utils.waxpeer import create_listing, edit_listing_price, search_items

load_dotenv()


async def skip_due_to_last_run(supabase, setting):
    last_waxpeer_log = await get_last_waxpeer_log(supabase, setting["user_id"])
    if not last_waxpeer_log:
        return False
    last_log_time = datetime.strptime(
        last_waxpeer_log["created_at"], "%Y-%m-%dT%H:%M:%S.%fZ"
    )
    return (datetime.now() - last_log_time).seconds < 60


async def filter_valid_competitors(
    base_price: int, search_results: list, setting: dict
):
    """
    Filter out competitors that are not valid
    @return: list of valid competitors, new price in cents
    """
    valid_competitors = []
    undercut_by_price = setting["undercut_by_price"]
    undercut_by_percentage = setting["undercut_by_percentage"]
    undercut_by = setting["undercut_by"]
    listing_price_min = setting["listing_price_min"]
    listing_price_max = setting["listing_price_max"]
    always_undercut_by_percentage_if_listing_price_is_greater_than = setting[
        "always_undercut_by_percentage_if_listing_price_is_greater_than"
    ]
    new_price = None
    for result in search_results:
        competitor_price = (
            result["price"] / 10
        )  # on waxpeer 1000 = 1$ and on price empire 100 = 1$
        price = (
            competitor_price - undercut_by_price
            if undercut_by == "price"
            else math.ceil(
                competitor_price - (competitor_price * undercut_by_percentage / 100)
            )
        )
        if price > (
            base_price
            * (always_undercut_by_percentage_if_listing_price_is_greater_than / 100)
        ):
            price = math.ceil(
                competitor_price - (competitor_price * undercut_by_percentage / 100)
            )
        if (
            price >= listing_price_min
            and price < listing_price_max
            and not await is_item_in_my_inventory(setting["user_id"], result["item_id"])
        ):
            if not new_price or price < new_price:
                new_price = price
            valid_competitors.append(result)
    return valid_competitors, new_price


async def filter_price_range(price_ranges, base_price):
    """
    Filter out price ranges that are not valid
    * return first valid price range
    """
    for price_range in price_ranges:
        if (
            base_price >= price_range["source_price_min"]
            and base_price < price_range["source_price_max"]
        ):
            return price_range
    return None


async def is_item_already_listed(listings, item_id):
    """
    Check if item is already listed
    @return: bool
    """
    for listing in listings:
        if listing["item_id"] == item_id:
            return True, listing["id"]
    return False, None


async def bot():
    logger = get_logger("bot")
    while True:
        supabase = await get_supabase_client()
        settings = await get_general_settings(supabase)
        for setting in settings:
            try:
                other_logs_to_create = []
                logs_to_create = []
                if (
                    not setting["is_running"]
                    or not setting["waxpeer_key"]
                    or await skip_due_to_last_run(supabase, setting)
                ):
                    continue
                active_items = await get_items(supabase, setting["user_id"])
                if len(active_items) == 0:
                    other_logs_to_create.append(
                        {
                            "user_id": setting["user_id"],
                            "name": "ShieldPeer",
                            "message": "No active items found",
                            "type": "caution",
                            "image": "/logo.jpg",
                        }
                    )
                    await insert_unique_logs(supabase, other_logs_to_create)
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
                            price_ranges, item["price"]
                        )
                        if valid_price_range is None:
                            other_logs_to_create.append(
                                {
                                    "user_id": setting["user_id"],
                                    "name": item["market_hash_name"],
                                    "image": f"https://community.cloudflare.steamstatic.com/economy/image/{item['image']}",
                                    "message": f"No valid price range found for item ::: {item['asset_id']}",
                                    "type": "caution",
                                }
                            )
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
                        listing_price_max = item_settings["listing_price_max"]
                        listing_price_if_no_one_to_undercut = item_settings[
                            "listing_price_if_no_one_to_undercut"
                        ]
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
                    await create_listing(
                        [
                            {
                                "item_id": listing["asset_id"],
                                "price": listing["price"],
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
                                "price": listing["price"],
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
                                "message": f"New listing created for {listing['name']} at {listing['price']}",
                                "type": "success",
                            }
                            for listing in listings_to_create
                        ]
                    )
                if len(listings_to_update):
                    await edit_listing_price(
                        [
                            {
                                "item_id": listing["asset_id"],
                                "price": listing["price"],
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
                                "price": listing["price"],
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
                                "message": f"Price updated for {listing['name']} to {listing['price']}",
                                "type": "success",
                                "meta_data": {
                                    "listing_id": listing["id"],
                                },
                            }
                            for listing in listings_to_update
                        ]
                    )
                if len(logs_to_create):
                    await insert_logs(supabase, logs_to_create)
                    await insert_unique_logs(supabase, other_logs_to_create)
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
