export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type ProductsList = { products: Product[] };

export type ErrorBody = { message: string };
