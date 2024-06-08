# ShieldPeer: Secure CS:GO Skin Trade Bot

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgargmegham%2FShieldPeer)

ShieldPeer is a dedicated CS:GO Trading Bot designed to optimize and automate the process of buying and selling game skins on Waxpeer. The bot, backed by an assurance of safety and transparency in every transaction, is highly configurable allowing it to adjust and undercut prices based on user-defined parameters.

## Features

-   **Automated Trading**: Automates the process of buying and selling CS:GO skins.
-   **Undercutting**: The bot undercuts based on user-set parameters to outshine competitors.
-   **Security**: Ensures safe and secure trading.
-   **Integration with WaxPeer API**: Seamless Integration with Waxpeer API to facilitate transactions.
-   **Integration with PriceEmpire API**: Seamless Integration with PriceEmpire API to source pricing data.
-   **Integration with Steam API**: Fetches user inventory and profile data from Steam API.

Landing Page:
![Screenshot 2024-06-03 at 7 38 00 PM](https://github.com/gargmegham/ShieldPeer/assets/95271253/f51aa724-de87-48f0-8134-850f38edbb72)
![Screenshot 2024-06-03 at 7 38 18 PM](https://github.com/gargmegham/ShieldPeer/assets/95271253/2c928404-8304-443d-916c-17364c75f56b)
![Screenshot 2024-06-03 at 7 38 26 PM](https://github.com/gargmegham/ShieldPeer/assets/95271253/13b56cda-1290-482c-abae-a02c2da61d4d)
![Screenshot 2024-06-03 at 7 38 33 PM](https://github.com/gargmegham/ShieldPeer/assets/95271253/dabad14f-a368-452f-a2d5-552566a61b64)

### Setup

1. Clone the repository
2. Install the dependencies
    ```bash
    yarn
    ```
3. Create a `.env.local` file in the root directory and add the environment variables from the .env-example file.
4. Run the development server
    ```bash
    yarn dev
    ```
5. Bot python script available at [bot.py](/bot/bot.py)
6. For deploying the bot, follow this [guide](/bot/ReadMe.md)
7. Cron script for hitting server PriceEmpire API available at [cron.py](/bot/cron.py)

#### Instructions for using Image URLs from PriceEmpire API

-   https://community.cloudflare.steamstatic.com/economy/image/{image} for the image URL of the assets
-   https://avatars.akamai.steamstatic.com/{image}.jpg for the image URL of the user's profile picture

## Tech Stack

-   **Frontend**: Next.js, Tailwind CSS, ShadcnUI
-   **Backend**: Next.js API Routes
-   **Database**: Postgres from Supabase
-   **Scripts**: Python and GCP VMs
-   **APIs**: Waxpeer API, PriceEmpire API
-   **Deployment**: Vercel
-   **Containerization**: Docker

### General Know How

-   App ID is basically game id in steam e.x. 730 for CS:GO, see https://steamdb.info/apps/ for complete list
-   Steam inventory can be looked using https://steamcommunity.com/inventory/{steamId}/{appId}/{contextId} where most valve games just have a static context ID of 2
-   See https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/blob/master/lib/classes/TradeOffer.js#L275 for sending trade offers on steam, no official support for this is provided by valve
