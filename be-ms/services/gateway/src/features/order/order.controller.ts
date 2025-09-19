import { Request, Response } from "express";
import mongoose from "mongoose";
import { catchAsync } from "@shared/libs/catchAsync";
import { IAuthRequest } from "@shared/middlewares/auth.middleware";
import {
  OrderNotFoundError,
  InvalidOrderIdError,
  InvalidUserIdError,
  UnauthorizedError,
  ProductRequiredError,
} from "@shared/errors/apiErrors";

export const getOrderById = catchAsync(
  async (req: IAuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidOrderIdError();
    }

    // const orderOwnerId = order?.user?._id.toString();

    // if (userId !== orderOwnerId && userRole === "customer") {
    //   throw new UnauthorizedError();
    // }

    // res.status(200).json(order);
  }
);

//TODO: add validation for request body and role-based access control
export const createOrder = catchAsync(
  async (req: IAuthRequest, res: Response) => {
    const { products, totalPrice, delivery, paymentMethod } = req.body;
    const user = req.user;

    if (!user) {
      throw new UnauthorizedError();
    }

    if (products?.length === 0) {
      throw new ProductRequiredError();
    }

    // res.status(201).json(savedOrder);
  }
);

export const updateOrder = catchAsync(
  async (req: IAuthRequest, res: Response) => {
    const { id } = req.params;

    // res.status(200).json(updatedOrder);
  }
);

export const deleteOrder = catchAsync(
  async (req: IAuthRequest, res: Response) => {
    const { id } = req.params;

    //   res
    //     .status(200)
    //     .json({ message: `Order with ID ${id} deleted`, deletedOrder });
  }
);

export const getAllOrdersByCustomerId = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // res.status(200).json(orders);
  }
);

export const getAllOrders = catchAsync(
  async (req: IAuthRequest, res: Response) => {
    const userId = req.user?.id;

    // res.status(200).json(orders);
  }
);
