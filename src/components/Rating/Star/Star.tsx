import { ForwardedRef, forwardRef, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import style from "./Star.module.css";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
type StarProps = {
  filled: boolean;
  size?: SizeProp;
};
const Star = forwardRef(
  (props: StarProps, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <FontAwesomeIcon
        className={props.filled ? style["filled"] : style["empty"]}
        ref={ref}
        size={props.size ? props.size : "1x"}
        icon={faStar}
      />
    );
  }
);

export default Star;
