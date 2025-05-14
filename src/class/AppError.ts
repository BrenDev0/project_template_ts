export default class AppError extends Error {
    public readonly isOperational: boolean;
    public readonly context?: Record<string, unknown>;

    constructor(message: string, isOperational: boolean, context?: Record<string, unknown>) {
        super(message);
        this.isOperational = isOperational;
        this.context = context;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}