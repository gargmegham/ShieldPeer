import os
import time

import httpx
from dotenv import load_dotenv

from utils.logger import get_logger
from utils.supabase import get_general_settings, get_supabase_client, insert_log

load_dotenv()

SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")


async def cron():
    """
    Send a post request to the server every 60 minutes
    """
    logger = get_logger("cron")
    while True:
        try:
            client = await get_supabase_client()
            settings = await get_general_settings(client)
            for setting in settings:
                if not setting.get("price_empire_key"):
                    await insert_log(
                        client,
                        setting["user_id"],
                        "PriceEmpire",
                        "Price Empire key not set in settings",
                        "failure",
                        "https://www.shieldpeer.in/price-empire.svg",
                    )
                    continue
                if not setting.get("steam_id"):
                    await insert_log(
                        client,
                        setting["user_id"],
                        "Steam",
                        "Steam ID not set in settings",
                        "failure",
                        "https://www.shieldpeer.in/steam.svg",
                    )
                    continue
                async with httpx.AsyncClient() as client:
                    await client.post(
                        "https://shieldpeer.in/api/price-empire",
                        headers={"key": SUPABASE_SERVICE_KEY},
                        data={
                            "user_id": setting["user_id"],
                        },
                    )
        except Exception as err:
            logger.error(f"An error occurred in cron: {err}", exc_info=True)
        time.sleep(60 * 60)  # 60 minutes
