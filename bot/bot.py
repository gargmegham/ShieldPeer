import asyncio
from datetime import datetime

from dotenv import load_dotenv

from utils.logger import get_logger
from utils.supabase import (
    get_general_settings,
    get_items,
    get_last_waxpeer_log,
    get_supabase_client,
)

load_dotenv()


async def skip_due_to_last_run(supabase, setting):
    last_waxpeer_log = await get_last_waxpeer_log(supabase, setting.get("user_id"))
    if not last_waxpeer_log or not last_waxpeer_log.get("created_at"):
        return True
    last_log_time = datetime.strptime(
        last_waxpeer_log.get("created_at"), "%Y-%m-%dT%H:%M:%S.%fZ"
    )
    return (datetime.now() - last_log_time).seconds < 60


async def bot():
    logger = get_logger("bot")
    while True:
        try:
            supabase = await get_supabase_client()
            settings = await get_general_settings(supabase)
            for setting in settings:
                if (
                    not setting.get("is_running")
                    or not setting.get("waxpeer_key")
                    or await skip_due_to_last_run(supabase, setting)
                ):
                    continue
                active_items = await get_items(supabase, setting.get("user_id"))
                if len(active_items) == 0:
                    continue
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
