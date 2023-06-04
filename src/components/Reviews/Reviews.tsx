import React, { useCallback, useEffect, useState } from "react";
import style from "./Reviews.module.css";
import { addNotification } from "../../redux/notification/notificationSlice";
import { Review as UserReview } from "./Review/Review";
import Review from "./Review/Review";
import ReviewForm, { ReviewFormValues } from "./ReviewForm/ReviewForm";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
type ReviewsProps = {
  product_id: number;
  className?: string;
  canReview: boolean;
};
type ReviewResponse = {
  reviews: UserReview[];
  hasNextPage: boolean;
  canReview: boolean;
};
const Reviews = ({ product_id, canReview, className }: ReviewsProps) => {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [userCanReview, setUserCanReview] = useState(canReview);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const addReview = async (formValues: ReviewFormValues) => {
    try {
      await axios.post("review/addReview", {
        product_id,
        rating: formValues.rating,
        comment: formValues.comment,
      });
      dispatch(
        addNotification({
          id: nanoid(5),
          message: "Review successfully added",
          notificationType: "SUCCESS",
        })
      );
      setUserCanReview(false);
    } catch (error) {
      dispatch(
        addNotification({
          id: nanoid(5),
          message: "Error while trying to add a notification",
          notificationType: "ERROR",
        })
      );
    }
  };
  const getReviews = useCallback(async () => {
    try {
      const reviewsResponse = (
        await axios.get(`review/reviewsByProduct/${product_id}?page=${page}`)
      ).data as ReviewResponse;
      const { reviews, hasNextPage } = reviewsResponse;
      setReviews((prev) => [...prev, ...reviews]);
      if (hasNextPage) {
        setPage((prev) => prev + 1);
        setNextPage(true);
      } else setNextPage(false);
    } catch (error) {}
  }, [product_id]);
  useEffect(() => {
    setReviews([]);
    setNextPage(false);
    setPage(0);
    getReviews();
  }, [getReviews]);
  const productReviews = reviews.map((userReview) => {
    return (
      <li key={userReview.id} className={style[`review`]}>
        {
          <Review
            user={userReview.user}
            rating={userReview.rating}
            comment={userReview.comment}
            id={userReview.id}
          />
        }
      </li>
    );
  });
  return (
    <div className={style["reviews-wrapper"]}>
      {userCanReview && (
        <div className={style["form-wrapper"]}>
          <h3>Leave a review:</h3>
          <ReviewForm onSubmit={addReview} />
        </div>
      )}
      {productReviews.length ? (
        <ul className={className || style["reviews"]}>{productReviews}</ul>
      ) : (
        <h3>No reviews yet...</h3>
      )}
      {nextPage && (
        <button className={style["load-reviews"]} onClick={getReviews}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Reviews;
