import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export class CacheService {
    public static async getGuildConfig(guildId: string) {
        const config = await (db as any).guildConfig.findUnique({
            where: { guildId }
        });
        return config || { prefix: '!' };
    }
}
