import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")


def get_supabase_client() -> Client:
    """
    Get the Supabase client
    """
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def get_general_settings(client: Client):
    """
    Get the general settings for all users
    @param client: The Supabase client
    """
    response = client.table("Settings").select("*").execute()
    return response.get("data", [{}])


def get_item_settings(client: Client):
    """
    Get the settings for all items
    @param user_id: The user id
    @param item_id: The item id
    @param client: The Supabase client
    """
    response = client.table("ItemSettings").select("*").execute()
    return response.get("data", {})


def get_items(client: Client):
    """
    Get all the items
    @param client: The Supabase client
    """
    response = client.table("Items").select("*").execute()
    return response.get("data", [])


def get_listings(client: Client):
    """
    Get all the listings
    @param user_id: The user id
    @param client: The Supabase client
    """
    response = client.table("Listing").select("*").execute()
    return response.get("data", [])


def insert_log(
    client: Client,
    user_id: str,
    name: str,
    message: str,
    type: str,
    image: str,
    meta_data: dict,
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
    return (
        client.table("Logs")
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


def insert_listing(client: Client, user_id: str, item_id: str, price: float):
    """
    Insert a listing
    @param user_id: The user id
    @param item_id: The item id
    @param price: The price of the item
    @param client: The Supabase client
    """
    return (
        client.table("Listing")
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


def update_listing(client: Client, user_id: str, item_id: str, price: float):
    """
    Update a listing
    @param user_id: The user id
    @param item_id: The item id
    @param price: The price of the item
    @param client: The Supabase client
    """
    return (
        client.table("Listing")
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
