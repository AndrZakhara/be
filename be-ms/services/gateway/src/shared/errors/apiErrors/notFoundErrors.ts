import { BaseError } from "@shared/errors/baseError";
import { ERROR_MESSAGES } from "@shared/constants/errorMessages";
import { HttpStatusCode } from "@shared/errors/error.types";

export class NotFoundError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.NOT_FOUND) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}

export class UserNotFoundError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.USER_NOT_FOUND) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}

export class ProductNotFoundError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.PRODUCT_NOT_FOUND) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}

export class OrderNotFoundError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.ORDER_NOT_FOUND) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}
