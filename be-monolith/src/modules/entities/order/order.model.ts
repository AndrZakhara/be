/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model, Types } from "mongoose";

interface IOrder {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  delivery: { address: string; service: "delivery" | "self pickup" };
  paymentMethod: "card" | "cash" | "bank_transfer";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    products: [
      new Schema(
        {
          product: { type: Types.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true, min: 1 },
        },
        { _id: false }
      ),
    ],
    totalPrice: { type: Number, required: true },
    delivery: {
      address: { type: String, required: true },
      service: {
        type: String,
        enum: ["delivery", "self pickup"],
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash", "bank transfer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: IOrder, ret: any) {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        if (ret.products) {
          ret.products = ret.products.map((p: any) => {
            return {
              product: p.product,
              quantity: p.quantity,
            };
          });
        }
      },
    },
  }
);

const Order = model<IOrder>("Order", orderSchema);

export { Order, IOrder };
