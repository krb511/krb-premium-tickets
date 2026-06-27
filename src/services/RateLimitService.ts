import { Collection } from 'discord.js';
import { config } from '../config/settings';

interface RateLimitData {
    count: number;
    resetTime: number;
}

export class RateLimitService {
    private static limits: Collection<string, RateLimitData> = new Collection();

    public static isLimited(userId: string, action: string): boolean {
        const key = `${userId}:${action}`;
        const now = Date.now();
        const userLimit = this.limits.get(key);

        if (!userLimit || now > userLimit.resetTime) {
            this.limits.set(key, { 
                count: 1, 
                resetTime: now + config.system.rateLimitWindow 
            });
            return false;
        }

        if (userLimit.count >= config.system.maxRequestsPerWindow) {
            return true;
        }

        userLimit.count++;
        this.limits.set(key, userLimit);
        return false;
    }
}
