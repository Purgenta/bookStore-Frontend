import { Discount } from "../../components/FeaturedProduct/FeaturedProduct";
import { ProductImage } from "../../components/FeaturedProduct/FeaturedProduct";
type Publisher = {
  name: string;
};
type Review = {
  comment: string;
  rating: number;
};
type Genre = {
  name: string;
  id: number;
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
  quantity: number;
  title: string;
  sale?: Discount;
  description: string;
  genre: Genre[];
  review: Review[];
  publisher: Publisher;
};
