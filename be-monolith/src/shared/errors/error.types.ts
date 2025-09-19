import { ERROR_MESSAGES } from "../constants/errorMessages";

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;

export interface ValidationErrorDetail {
  field: string;
  message: string;
  value?: unknown;
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    errors?: ValidationErrorDetail[];
    stack?: string;
  };
}

export interface ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors?: ValidationErrorDetail[];
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}
