import asyncio

from utils.logger import get_logger


async def bot():
    logger = get_logger("bot")


if __name__ == "__main__":
    logger = get_logger("bot")
    try:
        logger.info("ShieldPeer Bot: service started")
        asyncio.run(bot())
    except KeyboardInterrupt:
        logger.info("ShieldPeer Bot: service stopped")
    except Exception as err:
        logger.error(f"ShieldPeer Bot: {err}")
    finally:
        logger.info("ShieldPeer Bot: service stopped")
