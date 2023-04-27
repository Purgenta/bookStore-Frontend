import React, { useEffect, useState } from "react";
import style from "./Reviews.module.css";
import axios from "../../axios/publicAxiosInstance";
import { Review as UserReview } from "./Review/Review";
import Review from "./Review/Review";
type ReviewsProps = {
  product_id: number;
  className?: string;
};
type ReviewResponse = {
  reviews: UserReview[];
  hasNextPage: boolean;
};
const Reviews = ({ product_id, className }: ReviewsProps) => {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  console.log(reviews);
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
  return <ul className={className || style["reviews"]}>{productReviews}</ul>;
};

export default Reviews;
