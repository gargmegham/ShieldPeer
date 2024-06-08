import asyncio
import json
import os

import requests
from dotenv import load_dotenv

from utils.supabase import get_general_settings, get_supabase_client

load_dotenv()

SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")


async def cron():
    """
    Send a post request to the server every 60 minutes using a cron job
    """
    client = await get_supabase_client()
    settings = await get_general_settings(client)
    for setting in settings:
        url = "https://shieldpeer.in/api/price-empire"
        payload = json.dumps({"user_id": setting["user_id"]})
        headers = {"key": SUPABASE_SERVICE_KEY, "Content-Type": "application/json"}
        requests.request("POST", url, headers=headers, data=payload)


if __name__ == "__main__":
    asyncio.run(cron())
