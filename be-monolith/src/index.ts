import express from "express";
import App from "./app/expressApp";
import setupMetrics from "./app/providers/metrics";
import dbConnection from "./app/providers/db";
import { PORT, SWAGGER_PATH, API_VERSION } from "./config";

const StartServer = async () => {
  const app = express();

  await dbConnection();

  await App(app);

  setupMetrics(app);

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    console.log(
      `Swagger started on http://localhost:${PORT}/api/${API_VERSION}/${SWAGGER_PATH}`
    );
  });
};

StartServer();
