import { GuildConfig } from '@prisma/client';
import { db } from '../database/prisma';
import { Logger } from '../utils/Logger';
import { config } from '../config/settings';

export class CacheService {
    private static guildCache: Map<string, { data: GuildConfig; expiry: number }> = new Map();

    public static async getGuildConfig(guildId: string): Promise<GuildConfig> {
        const cached = this.guildCache.get(guildId);
        const now = Date.now();

        if (cached && cached.expiry > now) {
            return cached.data;
        }

        try {
            let guildConfig = await db.guildConfig.findUnique({ where: { guildId } });

            if (!guildConfig) {
                guildConfig = await db.guildConfig.create({
                    data: { guildId }
                });
                Logger.info(`[CACHE] Created new default config for guild: ${guildId}`);
            }

            this.guildCache.set(guildId, {
                data: guildConfig,
                expiry: now + config.system.cacheDuration
            });

            return guildConfig;
        } catch (error) {
            Logger.error(`[CACHE_SERVICE] Failed to fetch/create config: ${error}`);
            throw new Error('Database connection failed.');
        }
    }

    public static clearGuildCache(guildId: string): void {
        this.guildCache.delete(guildId);
        Logger.info(`[CACHE] Cleared cache for guild: ${guildId}`);
    }
}
