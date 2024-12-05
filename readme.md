# Roblox Game Authenticator

This project is a Discord bot that allows users to authenticate their Roblox accounts with a connected Roblox game using OAuth2. It is designed for niche cases, such as closed beta access to a select group in a Discord server.

## Features

- User authorization with proper error handling and logging
- Enhanced error handling and logging for client initialization, command registration, and event registration
- Modular and dynamic paths for subcommands
- Error handling and logging for server connection and events
- Refactored code to remove repetition
- Optimal data structure for caching
- Comprehensive error handling for utility functions
- Validated and secure configuration values

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ChronoAcceleration/robloxgameauth.git
   cd robloxgameauth
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Configure the bot by editing the `configuration.json` file with your secure values:
   ```json
   {
       "botToken": "your-secure-bot-token",
       "botClientId": "your-secure-bot-client-id",
       "robloxLongPollingPassword": "your-secure-roblox-long-polling-password"
   }
   ```

## Usage

1. Deploy the commands:
   ```bash
   node mainBot/MiscMain/deploy.js
   ```

2. Start the bot:
   ```bash
   node mainBot/main.js
   ```

Finished Product by Github Workspaces 💙
