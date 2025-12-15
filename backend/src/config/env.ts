import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
    PORT: z.string().default('5000'),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.string().default('6450'),
    DB_USER: z.string().default('postgres'),
    DB_PASSWORD: z.string().default('postgres'),
    DB_NAME: z.string().default('chat_and_notification'),
});

const parsed = EnvSchema.safeParse(process.env);

if(!parsed.success){
    console.error('Invalid environment variables:', parsed.error.format());
    process.exit(1);
}

export const env = parsed.data;