import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';
import { db } from '../database/prisma';

export const statsCommand = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('عرض إحصائيات نظام التذاكر'),
    
    async execute(interaction: CommandInteraction) {
        const totalTickets = await db.ticket.count({ where: { guildId: interaction.guildId! } });
        const openTickets = await db.ticket.count({ where: { guildId: interaction.guildId!, status: 'OPEN' } });

        const embed = new EmbedBuilder()
            .setTitle('📊 إحصائيات التذاكر')
            .addFields(
                { name: 'إجمالي التذاكر', value: `${totalTickets}`, inline: true },
                { name: 'التذاكر المفتوحة', value: `${openTickets}`, inline: true }
            )
            .setColor(0x000000);

        await interaction.reply({ embeds: [embed] });
    }
};
