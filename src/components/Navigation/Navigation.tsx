import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faBook,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
import { cartSelector } from "../../redux/cart/cartSlice";
import { favouritesCount } from "../../redux/favourites/favouritesSlice";
import { useEffect } from "react";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { getFavourites } from "../../redux/favourites/favouritesSlice";
import { AppDispatch } from "../../redux/store";
const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector(authenticationSelector);
  const { cartItems } = useSelector(cartSelector);
  const count = useSelector(favouritesCount);
  const axios = useAuthenticatedAxios();
  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(getFavourites(axios));
  }, [isAuthenticated]);
  return (
    <nav className={style["main-nav"]}>
      <div className={style["page-logo__wrapper"]}>
        <NavLink to={"/home"}>
          <FontAwesomeIcon icon={faBook} />
        </NavLink>
      </div>
      <ul className={style["account-actions"]}>
        <NavLink
          className={style["flex-link"]}
          to={isAuthenticated ? "/logout" : "/login"}
        >
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
