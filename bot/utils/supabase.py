from dotenv import load_dotenv
from supabase import create_client, Client
from supabase.client import ClientOptions

import os

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY')

def get_supabase_client() -> Client:
    """
    Get the Supabase client
    """
    return create_client(SUPABASE_URL, SUPABASE_KEY)