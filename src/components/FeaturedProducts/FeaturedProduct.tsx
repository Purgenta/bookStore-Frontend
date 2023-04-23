import style from "./FeaturedProduct.module.css";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
import {
  addFavouriteProduct,
  removeFavouriteProduct,
} from "../../redux/favourites/favouritesSlice";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
type ProductImage = {
  image_url: string;
};
export type Product = {
  id: number;
  page_number: number;
  price: number;
  productImages: ProductImage[];
  publishing_date: string;
  quantity: number;
  title: string;
};
interface FeaturedProductProps {
  product: Product;
  isFavourite: boolean;
}
const FeaturedProduct = ({ product, isFavourite }: FeaturedProductProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const axios = useAuthenticatedAxios();
  const { isAuthenticated } = useSelector(authenticationSelector);
  const imageURL = product.productImages[0]?.image_url;
  const { price, title, id } = product;
  const isFavouriteProduct = isFavourite
    ? style["favourite-product"]
    : style["add-favourite__product"];
  const onFavouriteClick = (event: React.SyntheticEvent) => {
    if (!isAuthenticated) return;
    if (!isFavourite) dispatch(addFavouriteProduct({ axios, product_id: id }));
    else dispatch(removeFavouriteProduct({ axios, product_id: id }));
  };
  return (
    <div className={style["featured-product"]}>
      <div className={style["img-wrapper"]}>
        <img
          className={style["book-cover__image"]}
          src={imageURL}
          alt={`${title} cover`}
        />
        <button
          onClick={onFavouriteClick}
          className={style["add-to__favourites"]}
        >
          <FontAwesomeIcon
            className={isFavouriteProduct}
            size="2x"
            icon={faHeart}
          />
        </button>
      </div>
      <div className={style["product-info"]}>
        <p className={style["title"]}>{title}</p>
        <p className={style["price"]}>
          {price.toFixed(2)}
          {`\u20AC`}
        </p>
      </div>
      <button className={style["add-cart"]}>Add to cart</button>
    </div>
  );
};

export default FeaturedProduct;
