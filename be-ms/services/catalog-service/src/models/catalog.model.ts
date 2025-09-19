import { Schema, model, Document } from "mongoose";

interface CatalogDocument extends Document {
  _id: Schema.Types.ObjectId;
  productId: string;
  name: string;
  title: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
}

const catalogSchema = new Schema<CatalogDocument>(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
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

catalogSchema.virtual("inStock").get(function (this: CatalogDocument) {
  return this.quantity > 0 ? true : false;
});

const Catalog = model<CatalogDocument>("Catalog", catalogSchema);

export { Catalog, CatalogDocument };
