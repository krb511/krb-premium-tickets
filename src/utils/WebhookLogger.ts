import { WebhookClient, EmbedBuilder } from 'discord.js';
import { WebhookLogPayload } from '../types';
import { Logger } from './Logger';

export class WebhookLogger {
    private static client: WebhookClient | null = null;

    public static setup(url: string) {
        this.client = new WebhookClient({ url });
    }

    public static async send(payload: WebhookLogPayload) {
        if (!this.client) return;
        
        try {
            const embed = new EmbedBuilder()
                .setTitle(payload.title)
                .setDescription(payload.description)
                .setColor(payload.color)
                .setTimestamp();
            
            if (payload.fields) embed.addFields(payload.fields);
            
            await this.client.send({ embeds: [embed] });
        } catch (error) {
            Logger.error(`[WEBHOOK] Failed to send log: ${error}`);
        }
    }
}
