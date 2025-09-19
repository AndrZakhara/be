export interface ProductDto {
  productId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
}
