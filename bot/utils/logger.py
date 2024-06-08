import logging
import os
import sys

from dotenv import load_dotenv

load_dotenv()


def get_logger(
    file_name: str = None,
    log_format: str = "%(asctime)s @%(name)s [%(levelname)s]:    %(message)s",
) -> logging.Logger:
    """Return an object Logger for logging.
    Args:
        log_format (str, optional): Log format.
    Returns:
        logging.Logger: Object of the Logger class for saving logs from the program.
    """
    logs_dir: str = os.getenv("LOGS_DIR", "/var/log/supervisor/")
    script_name = (
        sys.argv[0][sys.argv[0].rfind("/") + 1 : -3] if file_name is None else file_name
    )
    logs_path = f"{logs_dir}/{script_name}.log"
    try:
        open(logs_path)
    except IOError:
        # Create a file if it doesn't exist
        os.makedirs(os.path.dirname(logs_dir), exist_ok=True)
        file = open(logs_path, "x")
        file.close()
    # include traceback in logs
    logging.basicConfig(
        filename=logs_path,
        filemode="a",
        format=log_format,
        level=logging.INFO,
    )
    logger = logging.getLogger()
    return logger
