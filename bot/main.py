import asyncio

from dotenv import load_dotenv

from utils.logger import get_logger
from utils.supabase import get_general_settings, get_supabase_client

load_dotenv()


async def bot():
    logger = get_logger("bot")
    while True:
        try:
            supabase = get_supabase_client()
            settings = await get_general_settings(supabase)
            for setting in settings:
                # Add your code here
                pass
        except Exception as err:
            logger.error(f"An error occurred in bot: {err}", exc_info=True)
            # Wait for 60 seconds before trying again
            await asyncio.sleep(60)
            continue


if __name__ == "__main__":
    logger = get_logger("bot")
    try:
        logger.info("ShieldPeer Bot: service started")
        asyncio.run(bot())
    except KeyboardInterrupt:
        logger.info("ShieldPeer Bot: service stopped")
    except Exception as err:
        logger.error(f"ShieldPeer Bot:", exc_info=True)
    finally:
        logger.info("ShieldPeer Bot: service stopped")
