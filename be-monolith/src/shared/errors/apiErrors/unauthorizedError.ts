import { BaseError } from "../baseError";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { HttpStatusCode } from "../error.types";

export class UnauthorizedError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}
