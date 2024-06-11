import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from supabase._async.client import AsyncClient, create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")


async def get_supabase_client() -> AsyncClient:
    """
    Get the Supabase client
    """
    return await create_client(SUPABASE_URL, SUPABASE_KEY)


async def get_general_settings(client: AsyncClient):
    """
    Get the general settings for all users
    @param client: The Supabase client
    """
    response = await client.table("Settings").select("*").execute()
    return response.data


async def get_item_settings(client: AsyncClient, user_id: str, item_id: str):
    """
    Get settings for an item
    @param user_id: The user id
    @param item_id: The item id
    @param client: The Supabase client
    """
    response = (
        await client.table("ItemSettings")
        .select("*")
        .match(
            {
                "user_id": user_id,
                "item_id": item_id,
                "is_active": True,
            }
        )
        .limit(1)
        .execute()
    )
    if len(response.data) == 0:
        return None
    return response.data[0]


async def get_items(client: AsyncClient, user_id: str):
    """
    Get all active items for a user
    @param user_id: The user id
    @param client: The Supabase client
    """
    response = (
        await client.table("Items")
        .select("*")
        .match(
            {
                "user_id": user_id,
                "is_active": True,
            }
        )
        .execute()
    )
    return response.data


async def get_listings(client: AsyncClient, user_id: str):
    """
    Get all the listings for a user
    @param user_id: The user id
    @param client: The Supabase client
    """
    response = (
        await client.table("Listing").select("*").eq("user_id", user_id).execute()
    )
    return response.data


async def insert_logs(
    client: AsyncClient,
    logs: list,
):
    """
    Insert logs into the database
    @param logs: The logs to insert
    @param client: The Supabase client
    """
    response = await client.table("Logs").insert(logs).execute()
    return response.data


async def insert_unique_logs(
    client: AsyncClient,
    logs: list,
):
    """
    Insert logs into the database
    * Only insert logs that are not already in the database for the last hour
    @param logs: The logs to insert
    @param client: The Supabase client
    """
    unique_logs = set()
    logs_to_insert = []
    for log in logs:
        if log["message"] in unique_logs:
            continue
        # find the last log with the same message
        last_log = (
            await client.table("Logs")
            .select("*")
            .eq("user_id", log["user_id"])
            .eq("message", log["message"])
            .order("created_at", desc=True)
            .limit(1)
            .execute()
        )
        if len(last_log.data) == 0:
            logs_to_insert.append(log)
        else:
            last_log = last_log.data[0]
            # if the last log was more than 1 hour ago
            created_at = datetime.strptime(
                last_log["created_at"], "%Y-%m-%dT%H:%M:%S.%f%z"
            )
            if (datetime.now(timezone.utc) - created_at).total_seconds() > 3600:
                logs_to_insert.append(log)
        unique_logs.add(log["message"])
    response = await client.table("Logs").insert(logs_to_insert).execute()
    return response.data


async def insert_listings(client: AsyncClient, listings: list):
    """
    Insert listings into the database
    @param listings: The listings to insert
    @param client: The Supabase client
    """
    response = await client.table("Listing").insert(listings).execute()
    return response.data


async def update_listings(client: AsyncClient, listings):
    """
    Update listings in the database
    @param listings: The listings to update contains id, price, updated_at
    @param client: The Supabase client
    """
    response = await client.table("Listing").upsert(listings).execute()
    return response.data


async def get_last_waxpeer_log(client: AsyncClient, user_id: str):
    """
    Get the last waxpeer log
    @param user_id: The user id
    @param client: The Supabase client
    """
    response = (
        await client.table("Logs")
        .select("*")
        .eq("name", "Waxpeer")
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )
    if len(response.data) == 0:
        return None
    return response.data[0]


async def is_item_in_my_inventory(client: AsyncClient, user_id: str, asset_id: str):
    """
    Check if the item is in the user's inventory
    @param user_id: The user id
    @param asset_id: The asset id i.e. steam id
    @param client: The Supabase client
    @returns bool
    """
    response = (
        await client.table("Items")
        .select("*")
        .match(
            {
                "user_id": user_id,
                "asset_id": asset_id,
            }
        )
        .execute()
    )
    return len(response.data) > 0


async def get_price_ranges(client: AsyncClient, user_id: str):
    """
    Get the price ranges for a user
    @param user_id: The user id
    @param client: The Supabase client
    """
    response = (
        await client.table("PriceRange").select("*").eq("user_id", user_id).execute()
    )
    if response.data is None:
        return []
    return response.data
