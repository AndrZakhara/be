import { Request, Response } from "express";
import { Product } from "@modules/entities/product/product.model";
import { catchAsync } from "@shared/libs/catchAsync";

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10, category, sort = "-createdAt" } = req.query;

    const query: Record<string, unknown> = {};

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .sort(sort as string)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      data: products,
      pagination: {
        total: totalProducts,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalProducts / Number(limit)),
      },
    });
  }
);

export const searchProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { search } = req.query;
    // todo: implement search validation
    if (!search) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: search as string, $options: "i" } },
        { description: { $regex: search as string, $options: "i" } },
      ],
    });

    res.json(products);
  }
);

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await Product.distinct("category");
  res.json(categories.filter(Boolean));
});
