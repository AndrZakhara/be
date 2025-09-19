/* eslint-disable @typescript-eslint/no-explicit-any */
// This is a test client for the gRPC Catalog Service.
// It demonstrates how to call all available methods and handle errors.
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {
  // CatalogServiceClient,
  SearchRequest,
  GetProductsRequest,
  GetCategoriesRequest,
  ProductListResponse,
  CategoryListResponse,
} from "./grpc/generated/catalog";

const packageDefinition = protoLoader.loadSync(
  "./src/grpc/proto/catalog.proto",
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const catalogProto = grpc.loadPackageDefinition(packageDefinition);
const CatalogService = (catalogProto.catalog as any).CatalogService;

const client = new CatalogService(
  "localhost:50055",
  grpc.credentials.createInsecure()
);

function callService(
  method: string,
  request: any,
  callback: (error: any, response: any) => void
) {
  client[method](request, callback);
}

// -----------------------------------------------------------
// Test for searchProducts method (Successful search)
// -----------------------------------------------------------
const searchRequest: SearchRequest = { search: "27" };

console.log("--- Testing searchProducts (Successful) ---");

callService(
  "searchProducts",
  searchRequest,
  (error: any, response: ProductListResponse) => {
    if (error) {
      console.error(`Error: ${error.details} (Code: ${error.code})`);
    } else {
      console.log(
        "Found products:",
        response.products.map((p) => p.name)
      );
      console.log("Total found:", response.total);
    }
  }
);

// -----------------------------------------------------------
// Test for searchProducts method (Empty search term - should return an error)
// -----------------------------------------------------------
const emptySearchRequest: SearchRequest = { search: "" };

console.log("\n--- Testing searchProducts (Empty term - expect error) ---");

callService(
  "searchProducts",
  emptySearchRequest,
  (error: any, response: ProductListResponse) => {
    if (error) {
      console.error(`Error: ${error.details} (Code: ${error.code})`);
    } else {
      console.log("Unexpected success:", response);
    }
  }
);

// -----------------------------------------------------------
// Test for getProducts method (with pagination)
// -----------------------------------------------------------
const getProductsRequest: GetProductsRequest = {
  page: 1,
  limit: 2,
  category: "Electronics",
  sort: "-createdAt",
};

console.log("\n--- Testing getProducts (with pagination) ---");

callService(
  "getProducts",
  getProductsRequest,
  (error: any, response: ProductListResponse) => {
    if (error) {
      console.error(`Error: ${error.details} (Code: ${error.code})`);
    } else {
      console.log(
        "Received products:",
        response.products.map((p) => p.name)
      );
      console.log("Pagination:", response.page, "of", response.totalPages);
    }
  }
);

// -----------------------------------------------------------
// Test for getCategories method (get all available categories)
// -----------------------------------------------------------
const getCategoriesRequest: GetCategoriesRequest = {};
console.log("\n--- Testing getCategories ---");

callService(
  "getCategories",
  getCategoriesRequest,
  (error: any, response: CategoryListResponse) => {
    if (error) {
      console.error(`Error: ${error.details} (Code: ${error.code})`);
    } else {
      console.log("Available categories:", response.categories);
    }
  }
);
