import express from "express";
// import { authMiddleware } from "@shared/middlewares/auth.middleware";
import {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller";

const router = express.Router();

router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default {
  router,
  path: "/product",
};
