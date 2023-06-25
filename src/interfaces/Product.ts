export type Product = {
  description: string;
  id: string;
  image_url: string;
  name: string;
  price: string;
  type: string;
  category: string;
};

export type ProductsResponse = {
  data: Product[];
};
