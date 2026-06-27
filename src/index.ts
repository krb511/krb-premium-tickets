import { Client, GatewayIntentBits } from 'discord.js';
import { ErrorHandler } from './utils/ErrorHandler';
import { Logger } from './utils/Logger';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// تفعيل نظام الحماية العالمي
ErrorHandler.initializeGlobalHooks();

client.once('ready', () => {
    Logger.info(`[SYSTEM] Bot started successfully.`);
});

client.on('interactionCreate', async (interaction) => {
    // التوجيه الذكي (Routing) للمهام بناءً على الـ Interaction
});

client.login(process.env.DISCORD_TOKEN);
