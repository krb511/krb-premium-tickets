import { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';
import { db } from '../database/prisma';
import { CacheService } from '../services/CacheService';

export const ticketSetup: Command = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('إعداد نظام التذاكر في السيرفر')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option => option.setName('category').setDescription('قسم التذاكر')),

    async execute(interaction: CommandInteraction) {
        const category = interaction.options.get('category')?.value as string;
        
        await db.guildConfig.update({
            where: { guildId: interaction.guildId! },
            data: { ticketCategory: category }
        });

        CacheService.clearGuildCache(interaction.guildId!);
        await interaction.reply({ content: '✅ تم تحديث إعدادات النظام بنجاح.', ephemeral: true });
    }
};
