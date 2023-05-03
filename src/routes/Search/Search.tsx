import React from "react";
import style from "./Search.module.css";
const Search = () => {
  return (
    <div className={style["search"]}>
      <aside className={style["filter-options"]}></aside>
      <section className={style["search-results"]}></section>
    </div>
  );
};

export default Search;
