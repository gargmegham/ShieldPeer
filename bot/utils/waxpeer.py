import json

import httpx


async def edit_listing_price(items, apiKey: str):
    """
    Update the price of the item on Waxpeer
    *warning* has rate limit of 2 requests per 120 seconds
    @param items: The items to update
    @param apiKey: The Waxpeer API key
    """
    payload = {"items": items}
    headers = {"accept": "application/json", "Content-Type": "application/json"}
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api.waxpeer.com/v1/edit-items?api={apiKey}",
            headers=headers,
            data=json.dumps(payload),
        )
    response.raise_for_status()
    return response.json()


async def create_listing(items, apiKey: str):
    """
    Create a listing on Waxpeer
    *warning* has rate limit of 2 requests per 120 seconds
    @param items: The items to create
    @param apiKey: The Waxpeer API key
    """
    payload = {"items": items}
    headers = {"accept": "application/json", "Content-Type": "application/json"}
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api.waxpeer.com/v1/list-items-steam?api={apiKey}",
            headers=headers,
            data=json.dumps(payload),
        )
    response.raise_for_status()
    return response.json()
