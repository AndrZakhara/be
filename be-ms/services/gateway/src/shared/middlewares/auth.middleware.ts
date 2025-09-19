import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";
// import { User, IUser } from "@modules/features/user/user.model";
import { validateObjectId } from "@shared/libs/validators";
import { catchAsync } from "@shared/libs/catchAsync";
import {
  TokenInvalidError,
  UnauthorizedError,
  UserNotFoundError,
} from "@shared/errors/apiErrors";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

interface IUser {
  id: string;
  email: string;
  role: string;
  tokenVersion: string;
}

export interface IAuthRequest extends Request {
  user?: IUser & Document;
}

interface IJwtPayload {
  id: string;
  tokenVersion: string;
}

export const authMiddleware = catchAsync(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new TokenInvalidError();
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as IJwtPayload;

    const { id, tokenVersion } = decoded;

    if (!id || !validateObjectId(id)) {
      throw new UnauthorizedError();
    }

    // const user = await User.findById(id);
    // if (!user) {
    //   throw new UserNotFoundError();
    // }

    // if (user?.tokenVersion !== tokenVersion) {
    //   throw new TokenInvalidError();
    // }

    // req.user = user;

    next();
  }
);
