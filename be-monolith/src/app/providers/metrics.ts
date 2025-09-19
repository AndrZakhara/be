import client from "prom-client";
import { Application, Request, Response } from "express";

export default (app: Application) => {
  const register = new client.Registry();

  client.collectDefaultMetrics({ register });

  app.get("/metrics", async (req: Request, res: Response) => {
    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());
  });
};
