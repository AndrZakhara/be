import { Request, Response } from "express";
import { User } from "./user.model";
import { catchAsync } from "@shared/libs/catchAsync";
import { validateObjectId } from "@shared/libs/validators";
import {
  InvalidUserIdError,
  UserNotFoundError,
} from "@shared/errors/apiErrors";

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    throw new InvalidUserIdError();
  }

  const user = await User.findById(id).select(
    "-password -resetPasswordToken -resetPasswordExpires"
  );

  if (!user) {
    throw new UserNotFoundError();
  }

  res.status(200).json(User);
});

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();

  res.status(201).json(savedUser);
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    throw new InvalidUserIdError();
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    select: "-password -resetPasswordToken -resetPasswordExpires",
  });

  if (!updatedUser) {
    throw new UserNotFoundError();
  }

  res.status(200).json(updatedUser);
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    throw new InvalidUserIdError();
  }

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new UserNotFoundError();
  }

  res.status(200).json({ message: "User deleted successfully" });
});
