type ReadMoreProps = {
  paragraph: string;
  className?: string;
  cutoff?: number;
};
import { useState } from "react";
import style from "./ReadMore.module.css";
const ReadMore = ({ paragraph, className, cutoff }: ReadMoreProps) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <p className={className || ""}>
      {readMore ? paragraph : paragraph.slice(0, cutoff || 350).concat("...")}
      <a
        onClick={() => setReadMore((prev) => !prev)}
        className={style["expand-description"]}
      >
        {readMore ? "Read less" : "Read more"}
      </a>
    </p>
  );
};

export default ReadMore;
