import { TextChannel, AttachmentBuilder } from 'discord.js';
import * as discordTranscripts from 'discord-html-transcripts';

export class TranscriptService {
    public static async generate(channel: TextChannel): Promise<AttachmentBuilder> {
        const attachment = await (discordTranscripts as any).createTranscript(channel, {
            filename: 'transcript.html',
        });
        return attachment as AttachmentBuilder;
    }
}
