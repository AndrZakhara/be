import { BaseError } from "../baseError";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { HttpStatusCode } from "../error.types";

export class ForbiddenError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.FORBIDDEN) {
    super(message, HttpStatusCode.FORBIDDEN);
  }
}
