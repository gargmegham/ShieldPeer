import os

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
            }
        )
        .limit(1)
        .single()
        .execute()
    )
    return response.data


async def get_items(client: AsyncClient, user_id: str):
    """
    Get all the items for a user
    @param user_id: The user id
    @param client: The Supabase client
    """
    response = await client.table("Items").select("*").eq("user_id", user_id).execute()
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


async def insert_log(
    client: AsyncClient,
    user_id: str,
    name: str,
    message: str,
    type: str,
    image: str,
    meta_data: dict = {},
):
    """
    Insert a log
    @param user_id: The user id
    @param name: The name of the associated item
    @param type: The type of the log, e.g. 'success', 'failure', 'caution'
    @param message: The message of the log
    @param image: The image of the item
    @param meta_data: The meta data of the log, can contain error, or listing_id
    @param client: The Supabase client
    """
    response = (
        await client.table("Logs")
        .insert(
            [
                {
                    "user_id": user_id,
                    "name": name,
                    "message": message,
                    "type": type,
                    "image": image,
                    "meta_data": meta_data,
                }
            ]
        )
        .execute()
    )
    return response.data


async def insert_listing(client: AsyncClient, user_id: str, item_id: str, price: float):
    """
    Insert a listing
    @param user_id: The user id
    @param item_id: The item id
    @param price: The price of the item
    @param client: The Supabase client
    """
    response = (
        await client.table("Listing")
        .insert(
            [
                {
                    "user_id": user_id,
                    "item_id": item_id,
                    "price": price,
                    "updated_at": "now()",  # Update the timestamp
                }
            ]
        )
        .execute()
    )
    return response.data


async def update_listing(client: AsyncClient, user_id: str, item_id: str, price: float):
    """
    Update a listing
    @param user_id: The user id
    @param item_id: The item id
    @param price: The price of the item
    @param client: The Supabase client
    """
    response = (
        await client.table("Listing")
        .update(
            {
                "price": price,
                "updated_at": "now()",  # Update the timestamp
            }
        )
        .eq("user_id", user_id)
        .eq("item_id", item_id)
        .execute()
    )
    return response.data
