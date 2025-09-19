import { ERROR_MESSAGES } from "../constants/errorMessages";
import { ApiError, HttpStatusCode, ValidationErrorDetail } from "./error.types";

export class BaseError extends Error implements ApiError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors: ValidationErrorDetail[];

  constructor(
    message: string = ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    statusCode: number = HttpStatusCode.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true,
    errors?: ValidationErrorDetail[]
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors || [];

    Error.captureStackTrace(this, this.constructor);
  }
}
