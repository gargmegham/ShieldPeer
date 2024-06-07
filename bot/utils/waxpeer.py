import json
from dataclasses import dataclass

import httpx


@dataclass
class ItemsType:
    id: int
    price: float


async def edit_listing_price(items: ItemsType, apiKey: str):
    """
    Update the price of the item on Waxpeer
    *warning* has rate limit of 2 requests per 120 seconds
    @param items: The items to update
    @param apiKey: The Waxpeer API key
    """
    payload = {"items": [{"item_id": item.id, "price": item.price} for item in items]}
    headers = {"accept": "application/json", "Content-Type": "application/json"}
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api.waxpeer.com/v1/edit-items?api={apiKey}",
            headers=headers,
            data=json.dumps(payload),
        )
    response.raise_for_status()
    return response.json()


async def create_listing(items: ItemsType, apiKey: str):
    """
    Create a listing on Waxpeer
    *warning* has rate limit of 2 requests per 120 seconds
    @param items: The items to create
    @param apiKey: The Waxpeer API key
    """
    payload = {"items": [{"item_id": item.id, "price": item.price} for item in items]}
    headers = {"accept": "application/json", "Content-Type": "application/json"}
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api.waxpeer.com/v1/list-items-steam?api={apiKey}",
            headers=headers,
            data=json.dumps(payload),
        )
    response.raise_for_status()
    return response.json()
