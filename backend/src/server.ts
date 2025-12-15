import { createApp } from "./app";
import { env } from "./config/env";
import { assertDatabaseConnection } from "./db/db";
import { logger } from "./lib/logger";
import http from "http";

async function bootstrap() {
    try{
       await assertDatabaseConnection();
       const app = createApp();
       const server = http.createServer(app);
       const port = env.PORT;
       server.listen(port, () => {
        logger.info(`Server is running on port ${port}`);
       });
    }
    catch(err){
        logger.error('Error starting server:', `${(err as Error).message}`);
        process.exit(1);
    }
}

bootstrap();