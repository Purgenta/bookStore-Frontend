import React, { useEffect, useState } from "react";
import style from "./Reviews.module.css";
import axios from "../../axios/publicAxiosInstance";
import { Review as UserReview } from "./Review/Review";
import Review from "./Review/Review";
import ReviewForm from "../ReviewForm/ReviewForm";
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
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewsResponse = (
          await axios.get(`/review/reviewsByProduct/${product_id}?page=${page}`)
        ).data as ReviewResponse;
        const { reviews, hasNextPage } = reviewsResponse;
        setReviews((prev) => [...prev, ...reviews]);
        if (hasNextPage) {
          setPage((prev) => prev + 1);
          setNextPage(true);
        }
      } catch (error) {}
    };
    getReviews();
  }, []);
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
      {canReview && (
        <div className={style["form-wrapper"]}>
          <h3>Leave a review:</h3>
          <ReviewForm onSubmit={(values) => console.log(values)} />
        </div>
      )}
      <ul className={className || style["reviews"]}>{productReviews}</ul>
      {nextPage && <button>Load More</button>}
    </div>
  );
};

export default Reviews;
