import client from "prom-client";

export const productRequestCounter = new client.Counter({
  name: "product_requests_total",
  help: "Total number of product API requests",
  labelNames: ["method", "status"] as const,
});

export const productRequestDuration = new client.Histogram({
  name: "product_request_duration_seconds",
  help: "Duration of product API requests in seconds",
  labelNames: ["method"] as const,
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 3, 5],
});
