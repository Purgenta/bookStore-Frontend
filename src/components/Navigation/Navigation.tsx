import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faBook,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
import { favouritesCount } from "../../redux/favourites/favouritesSlice";
import { useEffect } from "react";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { getFavourites } from "../../redux/favourites/favouritesSlice";
import { AppDispatch } from "../../redux/store";
const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector(authenticationSelector);
  const count = useSelector(favouritesCount);
  const axios = useAuthenticatedAxios();
  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(getFavourites(axios));
  }, [isAuthenticated]);
  return (
    <nav className={style["main-nav"]}>
      <div className={style["top-nav"]}>
        <div className={style["page-logo__wrapper"]}>
          <NavLink to={"/home"}>
            <FontAwesomeIcon size="xl" icon={faBook} />
          </NavLink>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          className={style["hamburger"]}
          size="xl"
        />
        <ul className={style["account-actions"]}>
          <NavLink
            className={style["flex-link"]}
            to={isAuthenticated ? "/logout" : "/login"}
          >
            <FontAwesomeIcon size="xl" icon={faUser}></FontAwesomeIcon>
            {isAuthenticated ? "Logout" : "Login"}
          </NavLink>
          <NavLink className={style["flex-link"]} to={"/favourites"}>
            <FontAwesomeIcon size="xl" icon={faHeart}></FontAwesomeIcon>
            <span className="favourite-count">{count}</span>
          </NavLink>
          <NavLink className={style["flex-link"]} to={"/cart"}>
            <FontAwesomeIcon size="xl" icon={faCartShopping}></FontAwesomeIcon>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
