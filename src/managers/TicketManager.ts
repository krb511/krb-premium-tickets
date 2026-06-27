import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export class TicketManager {
    public static async create(guildId: string, userId: string, category: string) {
        return await db.ticket.create({
            data: { guildId, userId, category, status: 'OPEN' }
        });
    }
}
