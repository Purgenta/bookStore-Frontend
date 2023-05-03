import React from "react";
import style from "./HighlightedFeatures.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFile, faHouse } from "@fortawesome/free-solid-svg-icons";
type HighlightedFeaturesProps = {
  page_number: number;
  publishing_date: Date;
  publisher: string;
};
const HighlightedFeatures = ({
  page_number,
  publishing_date,
  publisher,
}: HighlightedFeaturesProps) => {
  return (
    <ul className={style[`highlighted-information`]}>
      <li>
        Publishing date
        <FontAwesomeIcon
          className={style["highlight-icon"]}
          size={"2xl"}
          icon={faCalendar}
        />
        {publishing_date.toLocaleString("default", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })}
      </li>
      <li>
        Page number
        <FontAwesomeIcon
          className={style["highlight-icon"]}
          size={"2xl"}
          icon={faFile}
        />
        {page_number}
      </li>
      <li>
        Publisher name
        <FontAwesomeIcon
          className={style["highlight-icon"]}
          size={"2xl"}
          icon={faHouse}
        />
        {publisher}
      </li>
    </ul>
  );
};

export default HighlightedFeatures;
