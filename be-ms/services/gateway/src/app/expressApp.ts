import express, { Application } from "express";
import { API_VERSION, SWAGGER_PATH } from "../config";

import authRoutes from "../features/auth/auth.routes";
import catalogRoutes from "../features/catalog/catalog.routes";
import orderRoutes from "../features/order/order.routes";
import productRoutes from "../features/product/product.routes";
import userRoutes from "../features/user/user.routes";
import { errorMiddleware } from "../shared/middlewares/error.middleware";
import { swaggerMiddleware, swaggerSetup } from "./providers/swagger";

const routes = [
  authRoutes,
  catalogRoutes,
  orderRoutes,
  productRoutes,
  userRoutes,
];

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json({ limit: "10kb" }));

  const api = `/api/${API_VERSION}`;

  // Optional health check
  app.use(`/`, (req, res, next) => {
    if (req.path === "/") return res.send(`API ${API_VERSION} is running`);
    next();
  });

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  routes.forEach(({ path, router }) => {
    app.use(`${api}${path}`, router);
  });

  app.use(`${api}/${SWAGGER_PATH}`, swaggerMiddleware, swaggerSetup);

  app.use(errorMiddleware);

  return app;
};
