/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/baseError";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { HttpStatusCode } from "../errors/error.types";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: ERROR_MESSAGES.VALIDATION_FAILED,
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  // TODO: Integrate with a logging system like Winston or Morgan
  console.error(err);

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  });
};
