import { Interaction, ButtonInteraction, StringSelectMenuInteraction } from 'discord.js';
import { TicketManager } from './TicketManager';
import { ErrorHandler } from '../utils/ErrorHandler';

export class InteractionManager {
    public static async handleButton(interaction: ButtonInteraction) {
        try {
            switch (interaction.customId) {
                case 'ticket_claim':
                    await interaction.reply({ content: '✅ تم استلام التذكرة من قبل الإدارة.', ephemeral: true });
                    break;
                case 'ticket_close':
                    // هنا يتم استدعاء logic الإغلاق والـ Transcript
                    await interaction.reply({ content: '🔒 جاري إغلاق التذكرة...' });
                    break;
            }
        } catch (error) {
            await ErrorHandler.handle(error, interaction);
        }
    }

    public static async handleSelectMenu(interaction: StringSelectMenuInteraction) {
        if (interaction.customId === 'category_select') {
            await interaction.deferReply({ ephemeral: true });
            try {
                const channel = await TicketManager.create(interaction.guild!, interaction.user, interaction.values[0]);
                await interaction.editReply({ content: `✅ تم فتح تذكرتك في: ${channel.url}` });
            } catch (error: any) {
                if (error.message === 'LIMIT_REACHED') {
                    await interaction.editReply({ content: '❌ لديك تذكرة مفتوحة بالفعل!' });
                } else {
                    await ErrorHandler.handle(error, interaction);
                }
            }
        }
    }
}
