import { BaseError } from "../baseError";
import { ERROR_MESSAGES } from "@constants/errorMessages";
import { HttpStatusCode } from "../error.types";

export class ConflictError extends BaseError {
  constructor(message: string = ERROR_MESSAGES.DUPLICATE_ENTRY) {
    super(message, HttpStatusCode.CONFLICT);
  }
}
