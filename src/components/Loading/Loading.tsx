import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import style from "./Loading.module.css";
export default function Loading() {
  return (
    <div className={style["loading"]}>
      <FontAwesomeIcon
        size="3x"
        icon={faSpinner}
        className={style["spinner"]}
      ></FontAwesomeIcon>
    </div>
  );
}
