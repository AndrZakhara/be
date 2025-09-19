import { Request, Response } from "express";
import { validateObjectId } from "@shared/libs/validators";
import { Product } from "./product.model";
import { IAuthRequest } from "@shared/middlewares/auth.middleware";
import { catchAsync } from "@shared/libs/catchAsync";
import {
  ForbiddenError,
  ProductNotFoundError,
  InvalidProductIdError,
} from "@shared/errors/apiErrors";

export const getProductById = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!validateObjectId(productId)) {
      throw new InvalidProductIdError();
    }

    const product = await Product.findById(productId);

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

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  }
);
export const updateProduct = catchAsync(
  async (req: IAuthRequest, res: Response) => {
    if (req.user?.role !== "admin" && req.user?.role !== "moderator") {
      throw new ForbiddenError();
    }

    const productId = req.params.id;
    const updatedData = req.body;

    if (!validateObjectId(productId)) {
      throw new InvalidProductIdError();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true }
    );

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

    const product = await Product.findByIdAndDelete(productId);

    res
      .status(200)
      .json({ message: `Product with ID ${productId} deleted`, product });
  }
);
