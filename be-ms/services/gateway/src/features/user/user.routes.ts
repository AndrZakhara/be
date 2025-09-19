import express from "express";
import {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user.controller";

const router = express.Router();

router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default {
  router,
  path: "/account",
};
