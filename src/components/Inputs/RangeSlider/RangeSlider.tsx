import { useState, useRef, useEffect } from "react";

import { memo } from "react";
import style from "./RangeSlider.module.css";
type RangeSliderProps = {
  lower: number;
  labelUpper: string;
  labelLower: string;
  upper: number;
  symbol?: JSX.Element;
  onChange: (lower: number, upper: number) => unknown;
};
const RangeSlider = memo(
  ({ lower, upper, labelLower, labelUpper, onChange }: RangeSliderProps) => {
    lower = +Math.floor(lower);
    upper = +Math.ceil(upper);
    const [range, setRange] = useState({
      lower,
      upper,
    });
    const lowerRef = useRef<HTMLInputElement>(null!);
    const upperRef = useRef<HTMLInputElement>(null!);
    useEffect(() => {
      onChange(range.lower, range.upper);
    }, [range]);
    const onChangeLower = () => {
      const value = lowerRef.current.value;
      setRange((prev) => {
        return {
          ...prev,
          lower: +value,
        };
      });
    };
    const onChangeUpper = () => {
      const value = upperRef.current.value;
      setRange((prev) => {
        return {
          ...prev,
          upper: +value,
        };
      });
    };
    const rangeWidth = (range.upper - range.lower) / (upper - lower);
    const leftOffSet = 100 - ((upper - range.lower) / (upper - lower)) * 100;
    return (
      <div className={style["range-wrapper"]}>
        <div className={style["ranges"]}>
          <input
            min={lower}
            max={upper}
            ref={lowerRef}
            value={range.lower}
            onChange={onChangeLower}
            className={`${style["range"]} ${style["left"]}`}
            type={"range"}
          />
          <input
            max={upper}
            min={lower}
            value={range.upper}
            ref={upperRef}
            onChange={onChangeUpper}
            className={`${style["range"]} ${style["right"]}`}
            type={"range"}
          ></input>
          <div
            className={style["full-range"]}
            style={{
              width: `${rangeWidth * lowerRef.current?.offsetWidth}px`,
              left: `${leftOffSet}%`,
            }}
          />
          <div className={style["out-range"]} />
        </div>
        <div className={style["price"]}>
          <h3 className={style["price-lower"]}>{`${range.lower.toFixed(
            2
          )} ${labelLower}`}</h3>
          <h3 className={style["price-higher"]}>{`${range.upper.toFixed(
            2
          )} ${labelUpper}`}</h3>
        </div>
      </div>
    );
  }
);
export default RangeSlider;
