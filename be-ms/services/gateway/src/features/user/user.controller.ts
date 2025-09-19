import { Request, Response } from "express";
import { catchAsync } from "@shared/libs/catchAsync";
import { validateObjectId } from "@shared/libs/validators";
import {
  InvalidUserIdError,
  UserNotFoundError,
} from "@shared/errors/apiErrors";
import { userService } from "./user.service";
import { User as UserGrpc } from "@providers/grpcClients/rpc-protos/generated/user";

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    throw new InvalidUserIdError();
  }

  const { user } = await userService.getUserById({ id });

  if (!user) {
    throw new UserNotFoundError();
  }

  res.status(200).json(user);
});

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const userPayload: UserGrpc = req.body;

  const { user } = await userService.createUser({ user: userPayload });

  res.status(201).json(user);
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    throw new InvalidUserIdError();
  }

  const userPayload: UserGrpc = req.body;

  const { user } = await userService.updateUser({
    id,
    user: userPayload,
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  res.status(200).json(user);
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    throw new InvalidUserIdError();
  }

  const { message } = await userService.deleteUser({ id });

  res.status(200).json({ message });
});
