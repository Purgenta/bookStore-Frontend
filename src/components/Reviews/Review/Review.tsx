import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";
import ReadMore from "../../ReadMore/ReadMore";
import style from "./Review.module.css";
type User = {
  name: string;
  last_name: string;
};
export type Review = {
  comment: string;
  rating: number;
  user: User;
  id: number;
};
const Review = ({ comment, rating, user }: Review) => {
  let ratingStars: JSX.Element[] = [];
  while (rating > 0 || ratingStars.length < 5) {
    if (rating > 0) {
      ratingStars.push(
        <FontAwesomeIcon
          key={ratingStars.length}
          icon={faStar}
          className={style["filled-rating"]}
        />
      );
      rating--;
    } else {
      ratingStars.push(
        <FontAwesomeIcon
          key={ratingStars.length}
          icon={faStar}
          className={style["empty-rating"]}
        ></FontAwesomeIcon>
      );
    }
  }
  return (
    <div className={style["review-wrapper"]}>
      <div className={style["user-information"]}>
        <FontAwesomeIcon size="xl" icon={faUser}></FontAwesomeIcon>
        <h4
          className={style["user-name"]}
        >{`${user.name} ${user.last_name}`}</h4>
      </div>
      <div className={style["rating"]}>{ratingStars}</div>
      <ReadMore paragraph={comment} cutoff={350}></ReadMore>
    </div>
  );
};

export default Review;
