import { db } from '../database/prisma';

export class TicketManager {
    public static async create(guildId: string, userId: string, category: string) {
        // تم إزالة ticketId لأنه يُنشأ تلقائياً بواسطة قاعدة البيانات
        return await db.ticket.create({
            data: {
                guildId: guildId,
                userId: userId,
                category: category,
                status: 'OPEN',
                createdAt: new Date(),
            }
        });
    }
}
