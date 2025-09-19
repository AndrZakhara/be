import { BaseError } from "../baseError";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { HttpStatusCode } from "@shared/errors/error.types";

export class ValidationError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.VALIDATION_FAILED) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.INVALID_CREDENTIALS) {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}

export class TokenExpiredError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.TOKEN_EXPIRED) {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}

export class TokenInvalidError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.TOKEN_INVALID) {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}

export class InvalidEmailOrPasswordError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}

export class InvalidOrderIdError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.ORDER_ID_INVALID) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}

export class InvalidUserIdError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.USER_ID_INVALID) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}

export class InvalidProductIdError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.PRODUCT_ID_INVALID) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}
