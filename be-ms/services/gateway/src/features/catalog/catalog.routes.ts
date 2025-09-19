import express from "express";
import {
  getAllProducts,
  searchProducts,
  getCategories,
} from "./catalog.controller";

const router = express.Router();

router.get("/list", getAllProducts);
router.get("/search", searchProducts);
router.get("/categories", getCategories);

export default {
  router,
  path: "/catalog",
};
