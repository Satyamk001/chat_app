import type { NextFunction, Request, RequestHandler, Response } from "express";
import { logger } from "../lib/logger";
import { NotFoundError } from "../lib/errors";

export const notFoundHandler : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
    next(new NotFoundError('Route not found'));
}

