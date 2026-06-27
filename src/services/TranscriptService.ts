import { TextChannel, AttachmentBuilder } from 'discord.js';
import * as discordTranscripts from 'discord-html-transcripts';

export class TranscriptService {
    public static async generate(channel: TextChannel): Promise<AttachmentBuilder> {
        // نطلب من المكتبة أن ترجع Attachment مباشرة
        const attachment = await discordTranscripts.createTranscript(channel, {
            returnType: 'attachment',
            filename: 'transcript.html',
        });
        
        // التحقق أن النتيجة AttachmentBuilder
        return attachment as AttachmentBuilder;
    }
}
