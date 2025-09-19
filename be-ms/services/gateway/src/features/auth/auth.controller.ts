import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { IAuthRequest } from "@shared/middlewares/auth.middleware";
import { catchAsync } from "@shared/libs/catchAsync";
import {
  InvalidEmailOrPasswordError,
  UserAlreadyExistsError,
  UsernameAlreadyExistsError,
  UnauthorizedError,
} from "@shared/errors/apiErrors";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
const JWT_EXPIRES_IN = "1d";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { username, email, password, firstName, lastName, phone } = req.body;

  // const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  // console.log(existingUser?.email);

  // if (existingUser?.username === username) {
  //   throw new UsernameAlreadyExistsError();
  // }

  // if (existingUser?.email === email) {
  //   throw new UserAlreadyExistsError();
  // }

  const hashedPassword = await bcrypt.hash(password, 10);
  const tokenVersion = randomUUID();

  // const newUser = new User({
  //   username,
  //   email,
  //   password: hashedPassword,
  //   firstName,
  //   lastName,
  //   phone,
  //   tokenVersion,
  // });

  // await newUser.save();

  // const token = jwt.sign(
  //   {
  //     id: newUser._id,
  //     role: newUser.role,
  //     tokenVersion: newUser.tokenVersion,
  //   },
  //   JWT_SECRET,
  //   {
  //     expiresIn: JWT_EXPIRES_IN,
  //   }
  // );

  // res.status(201).json({
  //   token: `Bearer ${token}`,
  //   ...newUser.toJSON(),
  // });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // TODO: add Redis + pub/sub for cache tokenVersion

  // res.status(200).json({
  //   token: `Bearer ${token}`,
  //   ...user.toJSON(),
  // });
});

export const logout = catchAsync(async (req: IAuthRequest, res: Response) => {
  const { user } = req;

  res.status(200).json({ message: "Logged out successfully" });
});
