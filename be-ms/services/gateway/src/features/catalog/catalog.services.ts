import * as grpc from "@grpc/grpc-js";

import {
  SearchRequest,
  GetProductsRequest,
  GetCategoriesRequest,
  ProductListResponse,
  CategoryListResponse,
} from "@providers/grpcClients/rpc-protos/generated/catalog";
import { client } from "@providers/grpcClients/catalog.provider";

export const catalogService = {
  searchProducts(request: SearchRequest): Promise<ProductListResponse> {
    return new Promise((resolve, reject) => {
      client.searchProducts(
        request,
        (
          error: grpc.ServiceError | null,
          response: ProductListResponse | null
        ) => {
          if (error) {
            console.error("Error in searchProducts:", error);
            reject(error);
          } else {
            resolve(response!);
          }
        }
      );
    });
  },

  getProducts(request: GetProductsRequest): Promise<ProductListResponse> {
    return new Promise((resolve, reject) => {
      client.getProducts(
        request,
        (
          error: grpc.ServiceError | null,
          response: ProductListResponse | null
        ) => {
          if (error) {
            console.error("Error in getProducts:", error);
            reject(error);
          } else {
            resolve(response!);
          }
        }
      );
    });
  },

  getCategories(request: GetCategoriesRequest): Promise<CategoryListResponse> {
    return new Promise((resolve, reject) => {
      client.getCategories(
        request,
        (
          error: grpc.ServiceError | null,
          response: CategoryListResponse | null
        ) => {
          if (error) {
            console.error("Error in getCategories:", error);
            reject(error);
          } else {
            resolve(response!);
          }
        }
      );
    });
  },
};
