import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  productRequestCounter,
  productRequestDuration,
} from "./product.metrics";

export const withMetrics = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const end = productRequestDuration.startTimer({ method: req.method });
    try {
      await handler(req, res, next); // контролер обробляється
      productRequestCounter.inc({ method: req.method, status: res.statusCode });
    } catch (err) {
      productRequestCounter.inc({
        method: req.method,
        status: res.statusCode || 500,
      });
      next(err); // передаємо помилку middleware
    } finally {
      end();
    }
  };
};
