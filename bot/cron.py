import asyncio
import os

import httpx
from dotenv import load_dotenv

from utils.logger import get_logger
from utils.supabase import get_general_settings, get_supabase_client

load_dotenv()

SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")


async def cron():
    """
    Send a post request to the server every 60 minutes using a cron job
    """
    logger = get_logger("cron")
    logger.info("ShieldPeer Cron service started")
    try:
        client = await get_supabase_client()
        settings = await get_general_settings(client)
        for setting in settings:
            async with httpx.AsyncClient() as client:
                await client.post(
                    "https://shieldpeer.in/api/price-empire",
                    headers={"key": SUPABASE_SERVICE_KEY},
                    data={
                        "user_id": setting["user_id"],
                    },
                )
    except Exception as err:
        logger.error(f"An error occurred in cron:", exc_info=True)


if __name__ == "__main__":
    logger = get_logger("cron")
    try:
        logger.info("ShieldPeer Cron: service started")
        asyncio.run(cron())
    except KeyboardInterrupt:
        logger.info("ShieldPeer Cron: service stopped")
    except Exception as err:
        logger.error(f"ShieldPeer Cron:", exc_info=True)
    finally:
        logger.info("ShieldPeer Cron: service stopped")
