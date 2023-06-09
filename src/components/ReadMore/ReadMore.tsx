type ReadMoreProps = {
  paragraph: string;
  className?: string;
  cutoff?: number;
};
import { useState } from "react";
import style from "./ReadMore.module.css";
const ReadMore = ({ paragraph, className, cutoff }: ReadMoreProps) => {
  if (!cutoff) cutoff = 350;
  const [readMore, setReadMore] = useState(false);
  const showMore = paragraph.length < cutoff || readMore;
  return (
    <p className={className || ""}>
      {showMore ? paragraph : paragraph.slice(0, cutoff).concat("...")}
      {paragraph.length > cutoff && (
        <a
          onClick={() => setReadMore((prev) => !prev)}
          className={style["expand-description"]}
        >
          {readMore && paragraph.length > cutoff ? "Read less" : "Read more"}
        </a>
      )}
    </p>
  );
};

export default ReadMore;
