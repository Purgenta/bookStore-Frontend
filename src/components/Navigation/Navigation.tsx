import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
import { cartSelector } from "../../redux/cart/cartSlice";
import { favouritesCount } from "../../redux/favourites/favouritesSlice";
import { useEffect } from "react";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { FavouriteProduct } from "../../redux/favourites/favouritesSlice";
import { setFavourites } from "../../redux/favourites/favouritesSlice";
const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authenticationSelector);
  const { cartItems } = useSelector(cartSelector);
  const count = useSelector(favouritesCount);
  const axios = useAuthenticatedAxios();
  useEffect(() => {
    if (!isAuthenticated) return;
    const getFavourites = async () => {
      try {
        const favourites = (await axios.get("user/favourites"))
          .data as FavouriteProduct[];
        dispatch(setFavourites(favourites));
      } catch (error) {}
    };
    getFavourites();
  }, [isAuthenticated]);
  return (
    <nav className={style["main-nav"]}>
      <ul className={style["account-actions"]}>
        <NavLink to={isAuthenticated ? "/logout" : "/login"}>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          {isAuthenticated ? "Logout" : "Login"}
        </NavLink>
        <NavLink className={style["flex-link"]} to={"/favourites"}>
          <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
          <span className="favourite-count">{count}</span>
        </NavLink>
        <NavLink className={style["flex-link"]} to={"/cart"}>
          <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
          <span className="cart-item__count">{cartItems.length}</span>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
