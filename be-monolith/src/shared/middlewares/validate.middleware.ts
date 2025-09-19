import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = <T>(schema: ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData;
      next();
    } catch (err) {
      next(err);
    }
  };
};
