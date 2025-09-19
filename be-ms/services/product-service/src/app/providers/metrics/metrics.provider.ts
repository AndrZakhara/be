// src/metrics.ts
import express from "express";
import client from "prom-client";

export function startMetricsServer(port: number) {
  const app = express();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  });

  app.listen(port, () => {
    console.log(`Metrics server running on http://localhost:${port}/metrics`);
  });
}
