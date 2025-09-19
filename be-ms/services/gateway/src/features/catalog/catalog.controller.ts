import { Request, Response } from "express";
import { catchAsync } from "@shared/libs/catchAsync";
import { catalogService } from "./catalog.services";

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10, category, sort = "-createdAt" } = req.query;

    const products = await catalogService.getProducts({
      page: Number(page),
      limit: Number(limit),
      category: category as string,
      sort: sort as string,
    });

    const { products: productsArray, total: totalProducts } = products;

    const query: Record<string, unknown> = {};

    if (category) {
      query.category = category;
    }

    res.status(200).json({
      data: productsArray,
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

    if (!search) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const productsResponse = await catalogService.searchProducts({
      search: search as string,
    });

    res.status(200).json(productsResponse.products);
  }
);

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categoriesResponse = await catalogService.getCategories({});

  res.status(200).json(categoriesResponse.categories.filter(Boolean));
});
