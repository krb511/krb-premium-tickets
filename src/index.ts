import { Client, GatewayIntentBits, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

// 1. تعريف البوت
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// 2. أمر الاختبار (تم وضعه هنا لضمان عمله فوراً)
const pingCommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('للتحقق من سرعة عمل البوت'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply({ content: '🏓 البوت يعمل بكفاءة!', ephemeral: true });
    }
};

// 3. تشغيل البوت
client.once('ready', () => {
    console.log(`[SYSTEM] Bot started successfully as ${client.user?.tag}!`);
});

// 4. معالجة التفاعلات
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await pingCommand.execute(interaction);
    }
});

// 5. تسجيل الدخول
client.login(process.env.DISCORD_TOKEN);
