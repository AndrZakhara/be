import { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform(doc: IProduct, ret: any) {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

productSchema.virtual("inStock").get(function (this: IProduct) {
  return this.quantity > 0 ? true : false;
});

const Product = model<IProduct>("Product", productSchema);

export { Product, IProduct };
