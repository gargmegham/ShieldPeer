import math
from datetime import datetime

from utils.supabase import (
    get_last_waxpeer_log,
    is_item_in_my_inventory,
)


async def skip_due_to_last_run(supabase, setting):
    """
    Skip bot iteration if last run was less than 60 seconds ago
    @return: bool
    """
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
