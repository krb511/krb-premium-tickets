import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export const pingCommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('للتحقق من سرعة عمل البوت'),
    
    async execute(interaction: CommandInteraction) {
        await interaction.reply({ content: '🏓 بونج! البوت يعمل بكفاءة عالية.', ephemeral: true });
    }
};
