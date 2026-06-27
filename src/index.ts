import { Client, GatewayIntentBits } from 'discord.js';
import express from 'express';
import 'dotenv/config';

// 1. إعداد خادم الويب (لإرضاء Render)
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is online!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// 2. إعداد البوت
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`[SYSTEM] Bot started successfully as ${client.user?.tag}!`);
});

// 3. تسجيل الدخول
client.login(process.env.DISCORD_TOKEN);
