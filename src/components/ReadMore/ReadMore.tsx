import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
type ReadMoreProps = {
  paragraph: string;
  className?: string;
};
import { useState } from "react";
import style from "./ReadMore.module.css";
const ReadMore = ({ paragraph, className }: ReadMoreProps) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <p className={className || ""}>
      {readMore ? paragraph : paragraph.slice(0, 350).concat("...")}
      <a
        onClick={() => setReadMore((prev) => !prev)}
        className={style["expand-description"]}
      >
        <FontAwesomeIcon
          className={readMore ? style["read-less"] : style["read-more"]}
          icon={faGreaterThan}
        />
        {readMore ? "Read less" : "Read more"}
      </a>
    </p>
  );
};

export default ReadMore;
