import * as grpc from "@grpc/grpc-js";
import {
  CatalogServiceService,
  CatalogServiceServer,
  ProductResponse,
  ProductListResponse,
  SearchRequest,
  GetProductsRequest,
  CategoryListResponse,
  GetCategoriesRequest,
} from "@/grpc/generated/catalog";
import { GrpcError } from "@shared/errors/GrpcError";
import { Catalog } from "@/models/catalog.model";
import { mapProduct } from "@/mappers/catalog.mapper";

export const catalogService: CatalogServiceServer = {
  searchProducts: async (
    call: grpc.ServerUnaryCall<SearchRequest, ProductListResponse>,
    callback: grpc.sendUnaryData<ProductListResponse>
  ) => {
    const request: SearchRequest = call.request;

    if (!request.search || request.search.trim() === "") {
      const error = new GrpcError(
        grpc.status.INVALID_ARGUMENT,
        "Cannot be empty"
      );
      return callback(error, null);
    }

    try {
      const products = await Catalog.find({
        $or: [
          { name: { $regex: request.search, $options: "i" } },
          { title: { $regex: request.search, $options: "i" } },
        ],
      });

      if (products.length === 0) {
        const error = new GrpcError(grpc.status.NOT_FOUND, "Not found");
        return callback(error, null);
      }

      const gRPCProducts: ProductResponse[] = products.map((product) =>
        mapProduct(product)
      );

      const response: ProductListResponse = {
        products: gRPCProducts,
        total: products.length,
        page: 1,
        limit: products.length,
        totalPages: 1,
      };

      callback(null, response);
    } catch (err) {
      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error"
      );

      console.log(err);
      callback(error, null);
    }
  },

  getProducts: async (
    call: grpc.ServerUnaryCall<GetProductsRequest, ProductListResponse>,
    callback: grpc.sendUnaryData<ProductListResponse>
  ) => {
    const request: GetProductsRequest = call.request;

    try {
      const query: Record<string, unknown> = {};
      if (request.category) {
        query.category = request.category;
      }

      const page = request.page || 1;
      const limit = request.limit || 10;
      const sort = request.sort || "-createdAt";

      const products = await Catalog.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

      const totalProducts = await Catalog.countDocuments(query);
      const totalPages = Math.ceil(totalProducts / limit);

      const gRPCProducts: ProductResponse[] = products.map((product) =>
        mapProduct(product)
      );

      const response: ProductListResponse = {
        products: gRPCProducts,
        total: totalProducts,
        page: page,
        limit: limit,
        totalPages: totalPages,
      };

      callback(null, response);
    } catch (err) {
      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error"
      );

      console.log(err);
      callback(error, null);
    }
  },

  getCategories: async (
    call: grpc.ServerUnaryCall<GetCategoriesRequest, CategoryListResponse>,
    callback: grpc.sendUnaryData<CategoryListResponse>
  ) => {
    try {
      const categories = await Catalog.distinct("category");
      const filteredCategories = categories.filter(Boolean);

      const response: CategoryListResponse = {
        categories: filteredCategories,
      };

      callback(null, response);
    } catch (err) {
      const error = new GrpcError(
        grpc.status.INTERNAL,
        "Internal server error"
      );

      console.log(err);
      callback(error, null);
    }
  },
};
