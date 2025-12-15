import type { ErrorRequestHandler } from "express";
import { logger } from "../lib/logger";
import { HttpError } from "../lib/errors";
import { ZodError } from "zod";

export const errorHandler : ErrorRequestHandler = (err, req, res, next) => {
    logger.error(err.message, { details: err.details });
    if(err instanceof HttpError){
        return res.status(err.status).json({
            error: err.message,
            details: err.details,
        });
    }
    else if(err instanceof ZodError){
        return res.status(400).json({
            error: 'Validation Error',
            details: err.issues.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message,
            })),
        });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
}