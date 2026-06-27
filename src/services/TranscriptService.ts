import { TextChannel, AttachmentBuilder } from 'discord.js';
import * as discordTranscripts from 'discord-html-transcripts';
import { Logger } from '../utils/Logger';

export class TranscriptService {
    public static async generate(channel: TextChannel): Promise<AttachmentBuilder> {
        try {
            const attachment = await discordTranscripts.createTranscript(channel, {
                limit: -1,
                returnType: 'attachment',
                filename: `Transcript-${channel.name}.html`,
                saveImages: true,
                poweredBy: false, // ليعطي طابعاً احترافياً خاصاً بك
            });

            return attachment;
        } catch (error) {
            Logger.error(`[TRANSCRIPT] Failed to generate: ${error}`);
            throw new Error('TRANSCRIPT_FAILED');
        }
    }
}
