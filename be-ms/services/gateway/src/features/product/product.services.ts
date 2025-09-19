import * as grpc from "@grpc/grpc-js";
import {
  GetProductByIdRequest,
  CreateProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
  GetProductByIdResponse,
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
} from "@providers/grpcClients/rpc-protos/generated/product";
import { client } from "@providers/grpcClients/product.provider";

export const productService = {
  getProductById(
    request: GetProductByIdRequest
  ): Promise<GetProductByIdResponse> {
    return new Promise((resolve, reject) => {
      client.getProductById(
        request,
        (
          error: grpc.ServiceError | null,
          response: GetProductByIdResponse | null
        ) => {
          if (error) {
            console.error("Error in getProductById:", error);
            reject(error);
          } else {
            resolve(response!);
          }
        }
      );
    });
  },

  createProduct(request: CreateProductRequest): Promise<CreateProductResponse> {
    return new Promise((resolve, reject) => {
      client.createProduct(
        request,
        (
          error: grpc.ServiceError | null,
          response: CreateProductResponse | null
        ) => {
          if (error) {
            console.error("Error in createProduct:", error);
            reject(error);
          } else {
            resolve(response!);
          }
        }
      );
    });
  },

  updateProduct(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    return new Promise((resolve, reject) => {
      client.updateProduct(
        request,
        (
          error: grpc.ServiceError | null,
          response: UpdateProductResponse | null
        ) => {
          if (error) {
            console.error("Error in updateProduct:", error);
            reject(error);
          } else {
            resolve(response!);
          }
        }
      );
    });
  },

  deleteProduct(request: DeleteProductRequest): Promise<DeleteProductResponse> {
    return new Promise((resolve, reject) => {
      client.deleteProduct(
        request,
        (
          error: grpc.ServiceError | null,
          response: DeleteProductResponse | null
        ) => {
          if (error) {
            console.error("Error in deleteProduct:", error);
            reject(error);
          } else {
            resolve(response!);
          }
        }
      );
    });
  },
};
