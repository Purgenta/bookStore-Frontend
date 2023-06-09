import React, { useState } from "react";
import { useRef } from "react";
import style from "./Pagination.module.css";
import generateRange from "../../utility/generateRange";
type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onChange: (newPage: number) => unknown;
};
const Pagination = ({ pageCount, currentPage, onChange }: PaginationProps) => {
  let paginationButtons: JSX.Element[] = [];
  const handlePageChange = (value: number) => {
    return () => {
      onChange(value);
    };
  };
  const goRef = useRef<HTMLInputElement>(null!);
  const [gotoPage, setGotoPage] = useState(1);
  if (pageCount <= 5) {
    paginationButtons = generateRange(1, pageCount).map((value) => {
      return (
        <li key={value}>
          <button
            className={value === currentPage ? style["active"] : ""}
            onClick={handlePageChange(value)}
          >
            {value}
          </button>
        </li>
      );
    });
  } else {
    const pagesToDisplay: number[] = [];
    if (currentPage <= 2) {
      pagesToDisplay.push(...generateRange(1, 4), pageCount);
    } else if (currentPage >= pageCount - 2) {
      pagesToDisplay.push(
        1,
        ...generateRange(pageCount - 3, pageCount - 1),
        pageCount
      );
    } else {
      pagesToDisplay.push(
        1,
        ...generateRange(currentPage - 1, currentPage + 1),
        pageCount
      );
    }
    paginationButtons = pagesToDisplay.map((value) => {
      return (
        <li key={value}>
          <button
            className={value === currentPage ? style["active"] : ""}
            onClick={handlePageChange(value)}
          >
            {value}
          </button>
        </li>
      );
    });
  }
  return (
    <nav aria-label="pagination" className={style["nav-pagination"]}>
      <ul className={style["pagination"]}>
        {currentPage != 1 && (
          <li className="navigation-control">
            <button onClick={() => onChange(currentPage - 1)}>{`<`}</button>
          </li>
        )}
        {paginationButtons}
        {currentPage != pageCount && (
          <li className="navigation-control">
            <button onClick={() => onChange(currentPage + 1)}>{`>`}</button>
          </li>
        )}
      </ul>
      <div className={style["go-to"]}>
        <label htmlFor="page-goto">Go to</label>
        <div>
          <input
            max={pageCount}
            min={1}
            type="number"
            id="page-goto"
            name="page-goto"
            ref={goRef}
            onChange={(event) => {
              if (+event.target.value > pageCount || +event.target.value === 0)
                return;
              else setGotoPage(+event.target.value);
            }}
          />
          <button
            onClick={() => {
              onChange(gotoPage);
            }}
          >{`>`}</button>
        </div>
      </div>
    </nav>
  );
};
export default Pagination;
