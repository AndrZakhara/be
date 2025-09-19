import { Schema, model, Document } from "mongoose";

interface ProductDocument extends Document {
  _id: Schema.Types.ObjectId;
  productId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return this._id.toString();
      },
    },
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
    timestamps: true,
  }
);

productSchema.virtual("inStock").get(function (this: ProductDocument) {
  return this.quantity > 0 ? true : false;
});

const Product = model<ProductDocument>("Product", productSchema);

export { Product, ProductDocument };
