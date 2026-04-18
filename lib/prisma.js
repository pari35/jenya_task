/**
 * @file Prisma Client Singleton
 * @description Single instance of PrismaClient for the entire application
 */

import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
    constructor() {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaClient({
                log: process.env.NODE_ENV === 'development' 
                    ? ['query', 'info', 'warn', 'error']
                    : ['error'],
                errorFormat: 'pretty'
            });
            
            // Add middleware/hooks if needed
            // PrismaSingleton.instance.$use(async (params, next) => {
            //     // Add soft delete middleware, audit logging, etc.
            //     return next(params);
            // });
        }
        return PrismaSingleton.instance;
    }
}

const prisma = new PrismaSingleton();
export default prisma;