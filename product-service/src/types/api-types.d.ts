export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type Stock = {
  product_id: Product["id"];
  count: number;
};

export type AvailableProduct = Omit<Product, "id"> & Pick<Stock, "count">;

export interface ProductPostBody {
  title: string;
  description: string;
  price: number;
  count: number;
}
export type ProductsList = { products: Product[] };

export type InfoResponse = { message: string };
