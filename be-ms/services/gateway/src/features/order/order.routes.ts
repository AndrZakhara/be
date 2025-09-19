import express from "express";
import {
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersByCustomerId,
} from "./order.controller";

import { authMiddleware } from "@shared/middlewares/auth.middleware";

const router = express.Router();

router.get("/list", authMiddleware, getAllOrders);
router.get("/list/customer/:id", authMiddleware, getAllOrdersByCustomerId);
router.get("/:id", authMiddleware, getOrderById);
router.post("/", authMiddleware, createOrder);
router.put("/:id", authMiddleware, updateOrder);
router.delete("/:id", authMiddleware, deleteOrder);

export default {
  router,
  path: "/order",
};
