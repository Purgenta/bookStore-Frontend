import { Product } from "../../components/FeaturedProduct/FeaturedProduct";
type Publisher = {
  name: string;
};
export type ProductImage = {
  id: number;
  image_url: string;
};
export type Discount = {
  discount: number;
};
type Review = {
  comment: string;
  rating: number;
};
type Genre = {
  genre: {
    id: string;
    name: string;
  };
};
type Author = {
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
  genre: Genre[];
  review: Review[];
  publisher: Publisher;
};
