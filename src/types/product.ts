export type Publisher = {
  name: string;
  id: number;
};
export type Product = {
  id: number;
  page_number: number;
  price: number;
  productImages: ProductImage[];
  publishing_date: string;
  quantity: number;
  title: string;
  sale?: Discount;
};
export type ProductImage = {
  id: number;
  image_url: string;
};
export type Discount = {
  discount: number;
};
export type Review = {
  comment: string;
  rating: number;
};
export type Genre = {
  id: number;
  name: string;
};
export type Author = {
  name: string;
  id: number;
  last_name: string;
};
export type DetailedProduct = {
  id: number;
  page_number: number;
  price: number;
  author: Author;
  productImages: ProductImage[];
  publishing_date: string;
  similiarProducts: Product[];
  quantity: number;
  title: string;
  sale?: Discount;
  description: string;
  genre: Array<{ genre: Genre }>;
  review: Review[];
  publisher: Publisher;
};
