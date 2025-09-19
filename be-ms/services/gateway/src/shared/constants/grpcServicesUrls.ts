export const MS_RPC_URLS = {
  order: "localhost:50051",
  product:
    process.env.NODE_ENV === "stage" ? "product1:50052" : "localhost:50052",
  product2: "product2:50056",
  user: "localhost:50053",
  auth: "localhost:50054",
  catalog: "localhost:50055",
};

export const MS_GATEWAY_URL = "http://localhost:8030";

export const ORDER_PORT = 50051;
export const PRODUCT_PORT = 50052;
export const USER_PORT = 50053;
export const AUTH_PORT = 50054;
export const CATALOG_PORT = 50055;
export const GATEWAY_PORT = 8030;
