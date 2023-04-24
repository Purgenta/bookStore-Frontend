import style from "./FeaturedProduct.module.css";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "@reduxjs/toolkit";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
import {
  addFavouriteProduct,
  removeFavouriteProduct,
} from "../../redux/favourites/favouritesSlice";
import { addNotification } from "../../redux/notification/notificationSlice";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const axios = useAuthenticatedAxios();
  const { isAuthenticated } = useSelector(authenticationSelector);
  const imageURL = product.productImages[0]?.image_url;
  const { price, title, id } = product;
  const isFavouriteProduct = isFavourite
    ? style["favourite-product"]
    : style["add-favourite__product"];
  const onFavouriteClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!isFavourite) {
      dispatch(addFavouriteProduct({ axios, product_id: id }))
        .then(() => {
          dispatch(
            addNotification({
              message: "Favourite item added successfully",
              id: nanoid(5),
              notificationType: "SUCCESS",
            })
          );
        })
        .catch(() =>
          dispatch(
            addNotification({
              message: "Error while trying to add a favourite item",
              id: nanoid(5),
              notificationType: "ERROR",
            })
          )
        );
    } else {
      dispatch(removeFavouriteProduct({ axios, product_id: id }))
        .then(() => {
          dispatch(
            addNotification({
              message: "Favourite item removed successfully",
              id: nanoid(5),
              notificationType: "SUCCESS",
            })
          );
        })
        .catch(() =>
          dispatch(
            addNotification({
              message: "Error while trying to remove favourite item",
              id: nanoid(5),
              notificationType: "ERROR",
            })
          )
        );
    }
  };
  const addToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      await axios.post("cart/addCartItem", {
        product_id: id,
        quantity: 1,
      });
      dispatch(
        addNotification({
          message: "Item added successfully",
          notificationType: "SUCCESS",
          id: nanoid(5),
        })
      );
    } catch (error) {
      console.log(error);
      addNotification({
        message: "Issue adding item to the cart",
        notificationType: "ERROR",
        id: nanoid(5),
      });
    }
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
      <button onClick={addToCart} className={style["add-cart"]}>
        Add to cart
      </button>
    </div>
  );
};

export default FeaturedProduct;
