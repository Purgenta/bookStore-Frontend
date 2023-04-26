import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  addFavouriteProduct,
  removeFavouriteProduct,
} from "../../redux/favourites/favouritesSlice";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
import style from "./Favourite.module.css";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../redux/notification/notificationSlice";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { AppDispatch } from "../../redux/store";
import useFavouriteLookup from "../../redux/favourites/favouriteProductLookup";
type FavouritesProps = {
  product_id: number;
  className: string;
};
const Favourite = ({ product_id, className }: FavouritesProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const axios = useAuthenticatedAxios();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(authenticationSelector);
  const favourites = useFavouriteLookup();
  const isFavourite = favourites.has(product_id);
  const onFavouriteClick = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!isFavourite) {
      dispatch(addFavouriteProduct({ axios, product_id }))
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
      dispatch(removeFavouriteProduct({ axios, product_id }))
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
  return (
    <button className={className} onClick={onFavouriteClick}>
      <FontAwesomeIcon
        className={isFavourite ? style[""] : style["add-favourite__product"]}
        size="2x"
        icon={faHeart}
      />
    </button>
  );
};

export default Favourite;
