import { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } from 'discord.js';

export const ticketSetupCommand = {
    data: new SlashCommandBuilder()
        .setName('setup-tickets')
        .setDescription('إعداد نظام التذاكر')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction: CommandInteraction) {
        await interaction.reply({ content: '⚙️ تم تفعيل نظام التذاكر بنجاح!', ephemeral: true });
    }
};
