import { env } from "../config/env";
import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";
import { logger } from "../lib/logger";


export const pool = new Pool({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
});

export async function query<T extends QueryResultRow = QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>> {
    const result = await pool.query<T>(text, params as any[]);
    return result;
}

export async function assertDatabaseConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        logger.info('Database connection established');
        return result;
    } catch (error) {
        logger.error('Error establishing database connection:', error);
        throw error;
    }
}
