import asyncio

from utils.cron import cron
from utils.logger import get_logger

if __name__ == "__main__":
    logger = get_logger("main")
    try:
        logger.info("ShieldPeer service started")
        asyncio.run(cron())
    except KeyboardInterrupt:
        logger.info("ShieldPeer service stopped")
    except Exception as err:
        logger.error(f"An error occurred: {err}")
    finally:
        logger.info("ShieldPeer service stopped")
