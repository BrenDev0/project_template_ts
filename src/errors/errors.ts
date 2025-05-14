import AppError from "../class/AppError";

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed', context?: Record<string, unknown>) {
    super(message, true, context);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'You are not authorized to perform this action', context?: Record<string, unknown>) {
    super(message, true, context);
    this.name = 'AuthorizationError';
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request', context?: Record<string, unknown>) {
    super(message, true, context);
    this.name = 'BadRequestError';
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed', context?: Record<string, unknown>) {
    super(message, false, context);
    this.name = 'DatabaseError';
  }
}

export class InvalidIdError extends AppError {
  constructor(message = 'Invalid ID format', context?: Record<string, unknown>) {
    super(message, true, context);
    this.name = 'InvalidIdError';
  }
}


export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', context?: Record<string, unknown>) {
    super(message, true, context);
    this.name = 'NotFoundError';
  }
}


export class ValidationError extends AppError {
  constructor(message = 'Validation failed', context?: Record<string, unknown>) {
    super(message, true, context);
    this.name = 'ValidationError';
  }
}


