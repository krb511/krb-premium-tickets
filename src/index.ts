import express from 'express';
import { Client, GatewayIntentBits } from 'discord.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: any, res: any) => {
    res.send('Bot is Online');
});

app.listen(port, () => {
    console.log(`[SERVER] Web server is running on port ${port}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`[BOT] Logged in successfully as ${client.user?.tag}`);
});

// نظام كشف الأخطاء الجديد
if (!process.env.DISCORD_TOKEN) {
    console.error('[BOT ERROR] DISCORD_TOKEN is missing! Please check Render Environment Variables.');
} else {
    console.log('[BOT] Attempting to log in to Discord...');
    client.login(process.env.DISCORD_TOKEN).catch(error => {
        console.error('[BOT ERROR] Discord Login Failed:', error.message);
    });
}
