import { TextChannel, AttachmentBuilder } from 'discord.js';
import * as discordTranscripts from 'discord-html-transcripts';

export class TranscriptService {
    public static async generate(channel: TextChannel): Promise<AttachmentBuilder> {
        const attachment = await discordTranscripts.createTranscript(channel, {
            returnType: 'attachment',
            filename: 'transcript.html',
        });
        
        // التحويل الصريح لضمان توافق الأنواع
        return attachment as unknown as AttachmentBuilder;
    }
}
