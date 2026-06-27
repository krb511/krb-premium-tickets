import { CommandInteraction } from 'discord.js';
import { TicketManager } from './TicketManager';

export class InteractionManager {
    public static async handleTicket(interaction: CommandInteraction) {
        const guildId = interaction.guildId || "";
        const userId = interaction.user.id;
        
        await TicketManager.create(guildId, userId, "general");
        await interaction.reply({ content: 'تم فتح التذكرة!', ephemeral: true });
    }
}
