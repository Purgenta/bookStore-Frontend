import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faBook,
  faCartShopping,
  faBars,
  faSearch,
  faDoorOpen,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationSelector,
  invalidateAuthentication,
} from "../../redux/authentication/authenticationSlice";
import {
  favouritesCount,
  setFavourites,
} from "../../redux/favourites/favouritesSlice";
import { useEffect, useState } from "react";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { getFavourites } from "../../redux/favourites/favouritesSlice";
import { AppDispatch } from "../../redux/store";
import { addNotification } from "../../redux/notification/notificationSlice";
const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector(authenticationSelector);
  const count = useSelector(favouritesCount);
  const axios = useAuthenticatedAxios();
  const [isActive, setIsActive] = useState(false);
  const handleLogout = async () => {
    try {
      axios.get("account/logout");
      dispatch(invalidateAuthentication());
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error logging out",
          notificationType: "ERROR",
        })
      );
    }
  };
  useEffect(() => {
    if (!isAuthenticated) dispatch(setFavourites([]));
    else dispatch(getFavourites(axios));
  }, [isAuthenticated]);
  return (
    <nav className={style["main-nav"]}>
      <div className={style["top-nav"]}>
        <div className={style["page-logo__wrapper"]}>
          <NavLink aria-label="Home page" to={"/home"}>
            <img
              alt="logo"
              className={style["logo"]}
              src="https://www.knjizare-vulkan.rs/files/images/vulkan/logo.png.webp"
            />
          </NavLink>
        </div>

        <FontAwesomeIcon
          className={style["hamburger"]}
          icon={faBars}
          aria-label="open navigation"
          onClick={(e) => setIsActive(true)}
          size="xl"
        />
        <FontAwesomeIcon
          icon={faX}
          aria-label="close navigation"
          size="2x"
          onClick={() => setIsActive(false)}
          className={`${style["close"]} ${
            isActive ? style["active-close"] : ""
          }`}
        ></FontAwesomeIcon>
        <ul
          className={`${style["account-actions"]} ${
            isActive ? style["active-actions"] : ""
          }`}
        >
          <li>
            <NavLink
              aria-label="search"
              className={style["flex-link"]}
              to={"/search"}
            >
              <FontAwesomeIcon size="xl" icon={faSearch}></FontAwesomeIcon>
            </NavLink>
          </li>
          <li>
            <NavLink
              aria-label="account-action"
              className={style["flex-link"]}
              to={isAuthenticated ? "/profile" : "/login"}
            >
              <FontAwesomeIcon size="xl" icon={faUser}></FontAwesomeIcon>
            </NavLink>
          </li>
          <li>
            <div className={style["flex-link"]}>
              <FontAwesomeIcon
                aria-label="favourite-counter"
                size="xl"
                icon={faHeart}
              ></FontAwesomeIcon>
              <span className="favourite-count">{count}</span>
            </div>
          </li>
          <li>
            <NavLink
              aria-label="cart"
              className={style["flex-link"]}
              to={"/cart"}
            >
              <FontAwesomeIcon
                size="xl"
                icon={faCartShopping}
              ></FontAwesomeIcon>
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <div className={style["flex-link"]}>
                <button
                  aria-label="logout"
                  onClick={handleLogout}
                  className={style["logout-btn"]}
                >
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    size="xl"
                  ></FontAwesomeIcon>
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
