import 'dotenv/config';
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on('ready', () => {
    console.log(`${client.user?.username} has logged in`);
});


client.login(process.env.TOKEN);    