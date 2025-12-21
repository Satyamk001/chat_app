import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { clerkMiddleware } from './config/clerk';
import apiRouter from './routes';

export function createApp() {
    const app = express();
    app.use(cors(
        {
            origin: '*',
            credentials: true,
        }
    ));
    app.use(clerkMiddleware())
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/',apiRouter);
    app.use(errorHandler);
    app.use(notFoundHandler);
    return app;
}