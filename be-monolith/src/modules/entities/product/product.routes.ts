import express from "express";
import { authMiddleware } from "@shared/middlewares/auth.middleware";
import {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller";
import { withMetrics } from "./product.metricsWrapper";

const getProductByIdWithMetrics = withMetrics(getProductById);

const router = express.Router();

router.get("/:id", getProductByIdWithMetrics);
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default {
  router,
  path: "/product",
};
