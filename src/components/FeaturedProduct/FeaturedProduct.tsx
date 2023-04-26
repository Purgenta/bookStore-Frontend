import style from "./FeaturedProduct.module.css";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
import Favourite from "../Favourite/Favourite";
import { addNotification } from "../../redux/notification/notificationSlice";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import useLoginWarning from "../../hooks/useLoginWarning";
import { useNavigate } from "react-router-dom";
export type ProductImage = {
  id: number;
  image_url: string;
};
export type Discount = {
  discount: number;
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
interface FeaturedProductProps {
  product: Product;
}
const FeaturedProduct = ({ product }: FeaturedProductProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginWarning = useLoginWarning();
  const axios = useAuthenticatedAxios();
  const { isAuthenticated } = useSelector(authenticationSelector);
  const imageURL = product.productImages[0]?.image_url;
  const { price, title, id, sale } = product;
  const newPrice = sale?.discount
    ? price - (price * sale.discount) / 100
    : undefined;
  const addToCart = async () => {
    if (!isAuthenticated) {
      dispatch(loginWarning);
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
    } catch (error: any) {
      let message = "Issue adding item to the cart";
      if (isAxiosError(error)) {
        message = error.response?.data || message;
      }
      dispatch(
        addNotification({
          message,
          notificationType: "ERROR",
          id: nanoid(5),
        })
      );
    }
  };
  return (
    <div className={style["featured-product"]}>
      <Link to={`/product/${id}`} className={style["img-wrapper"]}>
        {sale?.discount && (
          <span className={style["discount"]}>-{sale.discount}%</span>
        )}
        <img
          className={style["book-cover__image"]}
          src={imageURL}
          alt={`${title} cover`}
        />
        <Favourite
          product_id={id}
          className={style["add-to__favourites"]}
        ></Favourite>
      </Link>
      <div className={style["product-info"]}>
        <p className={style["title"]}>{title}</p>
        <div className={style["price-information"]}>
          {newPrice && (
            <p className={style["new-price"]}>
              {newPrice.toFixed(2)}
              {`\u20AC`}
            </p>
          )}
          <p className={newPrice ? style["old-price"] : style["price"]}>
            {price.toFixed(2)}
            {`\u20AC`}
          </p>
        </div>
      </div>
      <button onClick={addToCart} className={style["add-cart"]}>
        Add to cart
      </button>
    </div>
  );
};

export default FeaturedProduct;
