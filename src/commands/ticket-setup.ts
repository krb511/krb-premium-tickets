import { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } from 'discord.js';

export const ticketSetupCommand = {
    data: new SlashCommandBuilder()
        .setName('setup-tickets')
        .setDescription('إعداد نظام التذاكر في السيرفر')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // حماية الأمر للمدراء فقط
    
    async execute(interaction: CommandInteraction) {
        // نستخدم interaction.reply بدلاً من التعقيدات التي تسبب خطأ options
        await interaction.reply({ content: '⚙️ جاري إعداد نظام التذاكر...', ephemeral: true });
    }
};
