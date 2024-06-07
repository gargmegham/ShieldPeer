import asyncio
import time

from logger import get_logger
from utils.supabase import get_general_settings, get_supabase_client


async def bot():
    """
    The bot
    """


if __name__ == "__main__":
    logger = get_logger()
    try:
        logger.info("Custom service started")
        asyncio.run(bot())
    except Exception as err:
        logger.error(f"An error occurred: {err}")
    finally:
        logger.info("Custom service stopped")
