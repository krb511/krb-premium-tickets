import express from 'express';
import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

// 1. إعداد السيرفر الوهمي (Dashboard) لإرضاء Render
const app = express();
const port = process.env.PORT || 3000;

// إضافة 'any' هنا تحل مشكلة TypeScript الصارمة
app.get('/', (req: any, res: any) => {
    res.send(`
        <html>
            <head>
                <title>KRB Bot Status</title>
            </head>
            <body style="background-color: #0c0f1d; color: #fff; font-family: sans-serif; text-align: center; padding-top: 100px;">
                <h1 style="color: #5865F2;">KRB Ticket System</h1>
                <p>Status: <span style="color: #57F287; font-weight: bold;">Online</span></p>
                <p>The bot is alive and running 24/7.</p>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`[SERVER] Web server is running on port ${port}`);
});

// 2. إعداد بوت الديسكورد
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

// 3. تسجيل الدخول باستخدام التوكن
client.login(process.env.DISCORD_TOKEN);
