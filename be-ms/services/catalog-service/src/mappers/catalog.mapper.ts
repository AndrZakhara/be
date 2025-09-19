import { CatalogDocument } from "../models/catalog.model";
import { ProductResponse } from "../grpc/generated/catalog";

export function mapProduct(doc: CatalogDocument): ProductResponse {
  return {
    id: doc._id.toString(),
    productId: doc.productId,
    name: doc.name,
    title: doc.title,
    price: doc.price,
    quantity: doc.quantity,
    category: doc.category,
    imageUrl: doc.imageUrl,
    inStock: doc.quantity > 0 ? true : false,
  };
}
