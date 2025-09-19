// export const MONGO_URI =
//   "mongodb://root:example@localhost:27021/product_db?authSource=admin";

export const MONGO_URI =
  process.env.NODE_ENV === "stage"
    ? "mongodb://root:example@product-db:27017/product_db?authSource=admin"
    : "mongodb://root:example@localhost:27021/product_db?authSource=admin";

// export const MONGO_URI =
//   "mongodb://root:example@product-db:27017/product_db?authSource=admin";
export const API_PORT = Number(process.env.PORT) || 50052;

export const METRICS_API_PORT = Number(process.env.METRICS_API_PORT) || 9091;

export const API_VERSION = "v1";
