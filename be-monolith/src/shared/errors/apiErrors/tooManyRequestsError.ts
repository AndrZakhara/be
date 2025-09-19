import { BaseError } from "../baseError";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { HttpStatusCode } from "../error.types";

export class TooManyRequestsError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.TOO_MANY_REQUESTS) {
    super(message, HttpStatusCode.TOO_MANY_REQUESTS);
  }
}
