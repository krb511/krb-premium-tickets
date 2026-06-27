import { ChannelType, Guild, PermissionFlagsBits, TextChannel, User, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { db } from '../database/prisma';
import { CacheService } from '../services/CacheService';
import { Logger } from '../utils/Logger';
import { config } from '../config/settings';

export class TicketManager {
    public static async create(guild: Guild, user: User, category: string): Promise<TextChannel> {
        const guildConfig = await CacheService.getGuildConfig(guild.id);
        
        // التحقق من الحد الأقصى للتذاكر المفتوحة
        const openTickets = await db.ticket.count({
            where: { guildId: guild.id, ownerId: user.id, status: { not: 'CLOSED' } }
        });

        if (openTickets >= guildConfig.maxOpenTickets) {
            throw new Error('LIMIT_REACHED');
        }

        const channel = await guild.channels.create({
            name: `ticket-${guildConfig.ticketCounter + 1}`,
            type: ChannelType.GuildText,
            parent: guildConfig.ticketCategory || undefined,
            permissionOverwrites: [
                { id: guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
                { id: user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
                { id: guild.members.me!.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels] }
            ]
        });

        await db.ticket.create({
            data: {
                guildId: guild.id,
                channelId: channel.id,
                ownerId: user.id,
                ticketId: guildConfig.ticketCounter + 1,
                category: category
            }
        });

        await db.guildConfig.update({
            where: { guildId: guild.id },
            data: { ticketCounter: { increment: 1 } }
        });

        // رسالة الترحيب
        const embed = new EmbedBuilder()
            .setTitle('تذكرة جديدة')
            .setDescription(guildConfig.welcomeMessage)
            .setColor(config.branding.colors.primary)
            .setTimestamp();

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId('ticket_claim').setLabel('استلام').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('ticket_close').setLabel('إغلاق').setStyle(ButtonStyle.Danger)
        );

        await channel.send({ content: `<@${user.id}>`, embeds: [embed], components: [row] });
        
        Logger.info(`[TICKET] Created: ${channel.name} by ${user.tag}`);
        return channel;
    }
}
