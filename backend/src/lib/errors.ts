export class HttpError extends Error {
    status : number;
    details?: string;
    constructor(status: number, message: string, details?: string){
        super(message);
        this.status = status;
        this.details = details;
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string = 'Not Found', details?: string){
        super(404, message, details);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string = 'Bad Request', details?: string){
        super(400, message, details);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = 'Unauthorized', details?: string){
        super(401, message, details);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = 'Forbidden', details?: string){
        super(403, message, details);
    }
}