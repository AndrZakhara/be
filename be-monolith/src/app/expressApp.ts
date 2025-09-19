import express, { Application } from "express";
import path from "path";
import { API_VERSION, SWAGGER_PATH } from "../config";

import authRoutes from "../modules/features/auth/auth.routes";
import catalogRoutes from "../modules/features/catalog/catalog.routes";
import orderRoutes from "../modules/entities/order/order.routes";
import productRoutes from "../modules/entities/product/product.routes";
import userRoutes from "../modules/entities/user/user.routes";
import { swaggerMiddleware, swaggerSetup } from "./providers/swagger";
import { errorMiddleware } from "../shared/middlewares/error.middleware";

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

  const imagePath = path.join(__dirname, "../images");

  app.use("/images", express.static(imagePath));

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
