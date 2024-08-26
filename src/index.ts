import 'dotenv/config';
import { GatewayIntentBits } from 'discord.js';
import CustomClient from './CustomClient';

const client = new CustomClient(
    {
        intents: [
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.Guilds,
        ]
    },
    process.env.TOKEN as string,
    process.env.CLIENT_ID as string,
    process.env.GUILD_ID as string
);

(async () => {
    await client.loadCommands();
    await client.loadEvents();
    await client.deployCommands();
    await client.login();
})();

