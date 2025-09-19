import * as grpc from "@grpc/grpc-js";
import {
  ProductServiceServer,
  GetProductByIdRequest,
  GetProductByIdResponse,
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
} from "@/grpc/generated/product";
import { GrpcError } from "@shared/errors/GrpcError";
import { Product } from "@/models/product.model";
import { mapProduct } from "@/mappers/product.mapper";

export const productService: ProductServiceServer = {
  getProductById: async (
    call: grpc.ServerUnaryCall<GetProductByIdRequest, GetProductByIdResponse>,
    callback: grpc.sendUnaryData<GetProductByIdResponse>
  ) => {
    const { productId: id } = call.request;

    if (!id) {
      const error = new GrpcError(
        grpc.status.INVALID_ARGUMENT,
        "Product ID is required."
      );

      return callback(error, null);
    }

    try {
      const product = await Product.findOne({ productId: id });

      if (!product) {
        const error = new GrpcError(
          grpc.status.NOT_FOUND,
          "Product not found."
        );

        return callback(error, null);
      } else {
        const response: GetProductByIdResponse = {
          product: mapProduct(product),
        };

        callback(null, response);
      }
    } catch (err) {
      console.error(err);

      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error."
      );

      callback(error, null);
    }
  },

  createProduct: async (
    call: grpc.ServerUnaryCall<CreateProductRequest, CreateProductResponse>,
    callback: grpc.sendUnaryData<CreateProductResponse>
  ) => {
    const { product: productData } = call.request;

    if (!productData) {
      const error = new GrpcError(
        grpc.status.INVALID_ARGUMENT,
        "Product data is required."
      );

      return callback(error, null);
    }

    try {
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();

      const response: CreateProductResponse = {
        product: mapProduct(savedProduct),
      };

      callback(null, response);
    } catch (err) {
      //TODO: add logger
      console.error(err);

      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error."
      );

      callback(error, null);
    }
  },

  updateProduct: async (
    call: grpc.ServerUnaryCall<UpdateProductRequest, UpdateProductResponse>,
    callback: grpc.sendUnaryData<UpdateProductResponse>
  ) => {
    const { productId, product: productData } = call.request;

    if (!productData) {
      const error = new GrpcError(
        grpc.status.INVALID_ARGUMENT,
        "Product data is required."
      );

      return callback(error, null);
    }

    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { productId },
        productData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedProduct) {
        const error = new GrpcError(
          grpc.status.NOT_FOUND,
          "Product not found."
        );

        return callback(error, null);
      }

      const response: UpdateProductResponse = {
        product: mapProduct(updatedProduct),
      };

      callback(null, response);
    } catch (err) {
      console.error(err);

      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error."
      );

      callback(error, null);
    }
  },

  deleteProduct: async (
    call: grpc.ServerUnaryCall<DeleteProductRequest, DeleteProductResponse>,
    callback: grpc.sendUnaryData<DeleteProductResponse>
  ) => {
    const { productId } = call.request;

    if (!productId) {
      const error = new GrpcError(
        grpc.status.INVALID_ARGUMENT,
        "Product ID is required."
      );

      return callback(error, null);
    }

    try {
      const deletedProduct = await Product.findOneAndDelete({
        productId,
      });

      if (!deletedProduct) {
        const error = new GrpcError(
          grpc.status.NOT_FOUND,
          "Product not found."
        );

        return callback(error, null);
      }

      const response: DeleteProductResponse = {
        message: "Product deleted successfully.",
      };

      callback(null, response);
    } catch (err) {
      console.error(err);

      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error."
      );

      callback(error, null);
    } finally {
      if (call.cancelled) {
        console.log("Call is cancelled");
      }
    }
  },
};

export default productService;
