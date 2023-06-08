import React, { useCallback, useEffect, useState } from "react";
import style from "./Reviews.module.css";
import { addNotification } from "../../redux/notification/notificationSlice";
import { Review as UserReview } from "../../types/review";
import Review from "./Review/Review";
import ReviewForm, { ReviewFormValues } from "./ReviewForm/ReviewForm";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import useGetReviews from "../../hooks/requests/reviews/useGetReviews";
type ReviewsProps = {
  product_id: number;
  className?: string;
  canReview: boolean;
};
const Reviews = ({ product_id, canReview, className }: ReviewsProps) => {
  console.log(product_id);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  console.log(reviews);
  const [userCanReview, setUserCanReview] = useState(canReview);
  const [page, setPage] = useState(0);
  const { data } = useGetReviews(product_id, page);
  const [nextPage, setNextPage] = useState(false);
  useEffect(() => {
    if (data) {
      setReviews((prev) => [...prev, ...data.reviews]);
      setNextPage(data.hasNextPage);
      setUserCanReview(data.canReview);
    } else setReviews([]);
  }, [data]);
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
          message: "Review successfully added",
          notificationType: "SUCCESS",
        })
      );
      setUserCanReview(false);
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while trying to add a notification",
          notificationType: "ERROR",
        })
      );
    }
  };
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
        <button
          className={style["load-reviews"]}
          onClick={() => setPage((page) => page + 1)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Reviews;
