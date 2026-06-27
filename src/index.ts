import { Client, GatewayIntentBits } from 'discord.js';
import express from 'express';
import 'dotenv/config';

// إعداد خادم الويب (الموقع الوهمي)
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <body style="background-color: #000; color: #fff; font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h1>KRB Ticket System</h1>
                <p>Status: <b>Online</b></p>
                <p>Bot is running and ready to handle tickets!</p>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// إعداد البوت
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`[SYSTEM] Bot is ready! Logged in as ${client.user?.tag}`);
});

// تسجيل الدخول باستخدام التوكن من الإعدادات
client.login(process.env.DISCORD_TOKEN);
