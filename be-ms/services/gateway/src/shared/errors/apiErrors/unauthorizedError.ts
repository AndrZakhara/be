import { BaseError } from "@shared/errors/baseError";
import { ERROR_MESSAGES } from "@shared/constants/errorMessages";
import { HttpStatusCode } from "@shared/errors/error.types";

export class UnauthorizedError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}
