import { BaseError } from "../baseError";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { HttpStatusCode } from "../error.types";

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
