/* eslint-disable @typescript-eslint/no-explicit-any */
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {
  ProductServiceClient,
  GetProductByIdRequest,
  CreateProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
  GetProductByIdResponse,
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
  ProductPayload,
} from "./grpc/generated/product";

// ... (частина з ініціалізацією клієнта залишилася без змін)
const packageDefinition = protoLoader.loadSync(
  "./src/grpc/proto/product.proto",
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const productProto = grpc.loadPackageDefinition(packageDefinition);
const ProductService = (productProto.product as any).ProductService;

const client: ProductServiceClient = new ProductService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);
// ...

function callService<RequestType, ResponseType>(
  method: keyof ProductServiceClient,
  request: RequestType
): Promise<ResponseType> {
  return new Promise((resolve, reject) => {
    (client[method] as any)(
      request,
      (error: grpc.ServiceError | null, response: ResponseType) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      }
    );
  });
}

async function runTests() {
  let testProductId: string;

  try {
    console.log("--- Testing createProduct (Successful) ---");
    const newProductPayload: ProductPayload = {
      name: "Test Product",
      description: "A product created for testing.",
      price: 99.99,
      quantity: 100,
      category: "Electronics",
      imageUrl: "http://example.com/image.jpg",
    };
    const createProductRequest: CreateProductRequest = {
      product: newProductPayload,
    };
    const createResponse = await callService<
      CreateProductRequest,
      CreateProductResponse
    >("createProduct", createProductRequest);
    testProductId = createResponse.product?.productId || "";
    console.log("Product created successfully:", createResponse.product?.name);
    console.log("Product ID:", testProductId);
    console.log(createResponse.product);

    // -----------------------------------------------------------
    // Test for getProductById method (Successful lookup)
    // -----------------------------------------------------------
    console.log("\n--- Testing getProductById (Successful) ---");
    const getProductRequest: GetProductByIdRequest = {
      productId: testProductId,
    };
    const getResponse = await callService<
      GetProductByIdRequest,
      GetProductByIdResponse
    >("getProductById", getProductRequest);
    console.log("Found product:", getResponse.product?.name);

    // -----------------------------------------------------------
    // Test for updateProduct method (Successful update)
    // -----------------------------------------------------------
    console.log("\n--- Testing updateProduct (Successful) ---");
    const updatedProductPayload: ProductPayload = {
      ...newProductPayload,
      price: 109.99,
      quantity: 95,
    };
    const updateProductRequest: UpdateProductRequest = {
      productId: testProductId,
      product: updatedProductPayload,
    };
    const updateResponse = await callService<
      UpdateProductRequest,
      UpdateProductResponse
    >("updateProduct", updateProductRequest);
    console.log("Product updated successfully:", updateResponse.product?.name);
    console.log("New price:", updateResponse.product?.price);
    console.log("New quantity:", updateResponse.product?.quantity);
    console.log(updateResponse);

    // -----------------------------------------------------------
    // Test for deleteProduct method (Successful deletion)
    // -----------------------------------------------------------
    console.log("\n--- Testing deleteProduct (Successful) ---");
    const deleteProductRequest: DeleteProductRequest = {
      productId: testProductId,
    };
    const deleteResponse = await callService<
      DeleteProductRequest,
      DeleteProductResponse
    >("deleteProduct", deleteProductRequest);
    console.log("Product deletion successful:", deleteResponse.message);

    // -----------------------------------------------------------
    // Test for getProductById method (Product not found - expect error)
    // -----------------------------------------------------------
    console.log("\n--- Testing getProductById (Not found - expect error) ---");
    try {
      await callService<GetProductByIdRequest, GetProductByIdResponse>(
        "getProductById",
        getProductRequest
      );
      console.log("Unexpected success: Product was found after deletion.");
    } catch (error: any) {
      if (error.code === grpc.status.NOT_FOUND) {
        console.error(
          `Correctly received error: ${error.details} (Code: ${error.code})`
        );
      } else {
        console.error(
          `Unexpected error: ${error.details} (Code: ${error.code})`
        );
      }
    }
  } catch (err: any) {
    console.error(
      `\nTest failed with an unexpected error: ${err.details} (Code: ${err.code})`
    );
  }
}

runTests();
