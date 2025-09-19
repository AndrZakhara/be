import { BaseError } from "../baseError";
import { ERROR_MESSAGES } from "@shared/constants/errorMessages";
import { HttpStatusCode } from "@shared/errors/error.types";

export class ForbiddenError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.FORBIDDEN) {
    super(message, HttpStatusCode.FORBIDDEN);
  }
}
