import { CommandInteraction, EmbedBuilder, ButtonInteraction, StringSelectMenuInteraction } from 'discord.js';
import { Logger } from './Logger';
import { config } from '../config/settings';

type SupportedInteractions = CommandInteraction | ButtonInteraction | StringSelectMenuInteraction;

export class ErrorHandler {
    public static async handle(error: unknown, interaction?: SupportedInteractions): Promise<void> {
        const errorMessage = error instanceof Error ? error.message : 'Unknown internal error';
        const errorStack = error instanceof Error ? error.stack : '';
        
        Logger.error(`[ERROR_HANDLER] ${errorMessage}\n${errorStack}`);

        if (interaction) {
            const embed = new EmbedBuilder()
                .setTitle('⚠️ عذراً، حدث خطأ في النظام')
                .setDescription('لقد واجهنا خطأ غير متوقع أثناء معالجة طلبك. تم تسجيل الخطأ وإبلاغ الإدارة.')
                .setColor(config.branding.colors.danger)
                .setTimestamp();

            try {
                if (interaction.deferred || interaction.replied) {
                    await interaction.editReply({ embeds: [embed], components: [] });
                } else {
                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } catch (replyError) {
                Logger.error(`[ERROR_HANDLER] Failed to send error response to user: ${replyError}`);
            }
        }
    }

    public static initializeGlobalHooks(): void {
        process.on('unhandledRejection', (reason: unknown) => {
            Logger.error(`[PROCESS] Unhandled Rejection: ${reason instanceof Error ? reason.stack : reason}`);
        });

        process.on('uncaughtException', (error: Error) => {
            Logger.error(`[PROCESS] Uncaught Exception: ${error.stack}`);
        });
    }
}
