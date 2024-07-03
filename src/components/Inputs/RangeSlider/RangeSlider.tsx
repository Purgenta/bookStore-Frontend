import React, { useCallback, useEffect, useState, useRef } from "react";
import style from "./RangeSlider.module.css";
type Props = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => unknown;
};
const MultiRangeSlider = ({ min, max, onChange }: Props) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  console.log(minVal, maxVal);
  useEffect(() => {
    if (minVal === undefined && min !== undefined) {
      setMinVal(min);
    }
    if (maxVal === undefined && max !== undefined) {
      setMaxVal(max);
    }
  }, [min, max, minVal, maxVal]);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null!);
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);
  useEffect(() => {
    onChange(minVal, maxVal);
  }, [minVal, maxVal]);
  console.log(minVal, maxVal);
  return (
    <div className={style["container"]}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={`${style["thumb"]} ${style["thumb--left"]}`}
        style={{ zIndex: minVal > max - 100 ? "5" : "0" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={`${style["thumb"]} ${style["thumb--right"]}`}
      />

      <div className={style["slider"]}>
        <div className={style["slider__track"]} />
        <div ref={range} className={style["slider__range"]} />
        <div className={style["slider__left-value"]}>{minVal}</div>
        <div className={style["slider__right-value"]}>{maxVal}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
