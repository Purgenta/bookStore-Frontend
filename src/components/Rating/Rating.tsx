import React, { useEffect, useRef } from "react";
type RatingProps = {
  onChange: (rating: number) => unknown;
};
import Star from "./Star/Star";
import { useState } from "react";
import style from "./Rating.module.css";
const Rating = ({ onChange }: RatingProps) => {
  const starsRefs = useRef(
    Array.from({ length: 5 }, () => useRef<SVGSVGElement>(null!))
  );
  const [rating, setRating] = useState(0);
  useEffect(() => {
    onChange(rating);
  }, [rating]);
  const stars = starsRefs.current.map((ref, index) => {
    return <Star ref={ref} size="xl" key={index} filled={rating - index > 0} />;
  });
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = event.pageX;
    let newRating = 0;
    for (const ref of starsRefs.current) {
      if (ref.current.getBoundingClientRect().left <= x) newRating++;
      else break;
    }
    setRating(newRating);
  };
  return (
    <div onClick={handleClick} className={style["rating-wrapper"]}>
      {stars}
    </div>
  );
};

export default Rating;
