import { createLogger, format, transports } from 'winston';

export const Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.printf(({ timestamp, level, message, stack }) => {
            const logMsg = stack || message;
            return `[${timestamp}] [${level.toUpperCase()}]: ${logMsg}`;
        })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                })
            )
        }),
        new transports.File({ filename: 'logs/system-errors.log', level: 'error' }),
        new transports.File({ filename: 'logs/system-combined.log' })
    ]
});
