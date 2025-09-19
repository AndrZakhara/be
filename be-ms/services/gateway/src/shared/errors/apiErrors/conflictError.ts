import { BaseError } from "@shared/errors/baseError";
import { ERROR_MESSAGES } from "@shared/constants/errorMessages";
import { HttpStatusCode } from "@shared/errors/error.types";

export class ConflictError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.DUPLICATE_ENTRY) {
    super(message, HttpStatusCode.CONFLICT);
  }
}
