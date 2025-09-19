import { BaseError } from "@shared/errors/baseError";
import { ERROR_MESSAGES } from "@shared/constants/errorMessages";
import { HttpStatusCode } from "@shared/errors/error.types";

export class BadRequestError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.BAD_REQUEST) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}

export class UserAlreadyExistsError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.USER_ALREADY_EXISTS) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}

export class UsernameAlreadyExistsError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.USERNAME_ALREADY_EXISTS) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}

export class ProductRequiredError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.PRODUCT_REQUIRED) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}
