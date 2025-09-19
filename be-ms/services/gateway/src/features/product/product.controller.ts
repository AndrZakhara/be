import { Request, Response } from "express";
import { validateObjectId } from "@shared/libs/validators";
import { IAuthRequest } from "@shared/middlewares/auth.middleware";
import { catchAsync } from "@shared/libs/catchAsync";
import { productService } from "./product.services";
import {
  ForbiddenError,
  ProductNotFoundError,
  InvalidProductIdError,
} from "@shared/errors/apiErrors";
import { ProductPayload } from "@providers/grpcClients/rpc-protos/generated/product";

export const getProductById = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!validateObjectId(productId)) {
      throw new InvalidProductIdError();
    }

    const { product } = await productService.getProductById({ productId });

    if (!product) {
      throw new ProductNotFoundError();
    }

    res.status(200).json(product);
  }
);

export const createProduct = catchAsync(
  async (req: IAuthRequest, res: Response) => {
    if (req.user?.role !== "admin" && req.user?.role !== "moderator") {
      throw new ForbiddenError();
    }

    const newProductData = req.body as ProductPayload;

    const { product } = await productService.createProduct({
      product: newProductData,
    });

    if (!product) {
      throw new Error("Product was not returned from gRPC service.");
    }

    res.status(201).json(product);
  }
);

export const updateProduct = catchAsync(
  async (req: IAuthRequest, res: Response) => {
    if (req.user?.role !== "admin" && req.user?.role !== "moderator") {
      throw new ForbiddenError();
    }

    const productId = req.params.id;
    const updatedData = req.body as Partial<ProductPayload>;

    if (!validateObjectId(productId)) {
      throw new InvalidProductIdError();
    }

    const { product: currentProduct } = await productService.getProductById({
      productId,
    });

    if (!currentProduct) {
      throw new ProductNotFoundError();
    }

    const productPayloadToSend: ProductPayload = {
      ...currentProduct,
      ...updatedData,
    };

    const { product: updatedProduct } = await productService.updateProduct({
      productId,
      product: productPayloadToSend,
    });

    if (!updatedProduct) {
      throw new ProductNotFoundError();
    }

    res.status(200).json(updatedProduct);
  }
);

export const deleteProduct = catchAsync(
  async (req: IAuthRequest, res: Response) => {
    if (req.user?.role !== "admin" && req.user?.role !== "moderator") {
      throw new ForbiddenError();
    }

    const productId = req.params.id;

    if (!validateObjectId(productId)) {
      throw new InvalidProductIdError();
    }

    const { message } = await productService.deleteProduct({ productId });

    res.status(200).json({ message });
  }
);
