import { ProductDocument } from "../models/product.model";
import { Product } from "@/grpc/generated/product";

export function mapProduct(doc: ProductDocument): Product {
  return {
    productId: doc.productId,
    name: doc.name,
    description: doc.description || "",
    price: doc.price,
    quantity: doc.quantity,
    category: doc.category,
    imageUrl: doc.imageUrl,
    inStock: doc.quantity > 0 ? true : false,
    createdAt: doc.createdAt?.toISOString() ?? "",
    updatedAt: doc.updatedAt?.toISOString() ?? "",
  };
}
