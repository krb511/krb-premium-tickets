import { PrismaClient } from '@prisma/client';
import { Logger } from '../utils/Logger';

class Database {
    private static instance: PrismaClient;

    private constructor() {}

    public static getInstance(): PrismaClient {
        if (!Database.instance) {
            Database.instance = new PrismaClient({
                log: ['error'], // لا نظهر سوى الأخطاء في وضع الإنتاج
            });
            Logger.info('[DATABASE] Prisma Client initialized successfully.');
        }
        return Database.instance;
    }
}

export const db = Database.getInstance();
