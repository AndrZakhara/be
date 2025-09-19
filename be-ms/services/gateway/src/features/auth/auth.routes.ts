import express from "express";
import { login, signup, logout } from "./auth.controller";
import { authMiddleware } from "@shared/middlewares/auth.middleware";
import { signupSchema, loginSchema } from "../user/user.schema";
import { validate } from "@shared/middlewares/validate.middleware";
const router = express.Router();

router.post("/login", validate(loginSchema), login);

router.post("/signup", validate(signupSchema), signup);

router.post("/logout", authMiddleware, logout);

export default {
  router,
  path: "/auth",
};
