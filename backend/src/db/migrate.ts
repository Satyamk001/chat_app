import path from 'node:path';
import {logger} from '../lib/logger';
import fs from 'node:fs';
import { query } from './db';

const migrationsPath = path.join(__dirname, '..', 'migrations');

export async function runMigrations() {
    try {
        logger.info('Running migrations...');
        const files = fs.readdirSync(migrationsPath).filter(file => file.endsWith('.sql')).sort();
        for(const file of files) {
            const filePath = path.join(migrationsPath, file);
            const content = fs.readFileSync(filePath, 'utf8').trim();
            if(content){
                await query(content);
                logger.info(`Migrated ${file}`);
            }
        }
        if(files.length == 0){
            logger.info('No migrations found');
            return;
        }
        logger.info('All migrations completed');
    } catch (error) {
        logger.error('Error running migrations:', (error as Error).message);
        throw error;
    }
}

runMigrations();