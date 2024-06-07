import json
from dataclasses import dataclass

import requests


@dataclass
class ItemsType:
    id: int
    price: float


def edit_listing_price(items: ItemsType, apiKey: str):
    """
    Update the price of the item on Waxpeer
    *warning* has rate limit of 2 requests per 120 seconds
    @param items: The items to update
    @param apiKey: The Waxpeer API key
    """
    payload = {"items": [{"item_id": item.id, "price": item.price} for item in items]}
    headers = {"accept": "application/json", "Content-Type": "application/json"}
    response = requests.post(
        f"https://api.waxpeer.com/v1/edit-items?api={apiKey}",
        {"method": "POST", "headers": headers, "body": json.dumps(payload)},
    )
    if response.ok:
        return response.json()
    response.raise_for_status()


def create_listing(items: ItemsType, apiKey: str):
    """
    Create a listing on Waxpeer
    *warning* has rate limit of 2 requests per 120 seconds
    @param items: The items to create
    @param apiKey: The Waxpeer API key
    """
    payload = {"items": [{"item_id": item.id, "price": item.price} for item in items]}
    headers = {"accept": "application/json", "Content-Type": "application/json"}
    response = requests.post(
        f"https://api.waxpeer.com/v1/list-items-steam?api={apiKey}",
        {"method": "POST", "headers": headers, "body": json.dumps(payload)},
    )
    if response.ok:
        return response.json()
    response.raise_for_status()
