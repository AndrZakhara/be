import { BaseError } from "@shared/errors/baseError";
import { ERROR_MESSAGES } from "@shared/constants/errorMessages";
import { HttpStatusCode } from "@shared/errors/error.types";

export class TooManyRequestsError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.TOO_MANY_REQUESTS) {
    super(message, HttpStatusCode.TOO_MANY_REQUESTS);
  }
}
