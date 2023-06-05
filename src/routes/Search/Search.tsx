import { useEffect, useState } from "react";
import style from "./Search.module.css";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import { QueryParams } from "../../hooks/requests/books/useGetBooks";
import useGetFilterData from "../../hooks/requests/books/useGetFilterData";
import useGetBooks from "../../hooks/requests/books/useGetBooks";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";
import Loading from "../../components/Loading/Loading";
const initState: Omit<QueryParams, "page"> = {
  priceLb: 0,
  priceUb: 100000,
  orderBy: "price",
  sort: "asc",
  genres: [],
};
const Search = () => {
  const { data: filterOptions } = useGetFilterData();
  const [page, setPage] = useState(1);
  const [queryOptions, setQueryOptions] =
    useState<Omit<QueryParams, "page">>(initState);
  const [dataFetcher, setDataFetcher] = useState({ ...initState, page: 1 });
  useEffect(() => {
    const timeout = setTimeout(
      () => setDataFetcher((prev) => ({ page: 1, ...queryOptions })),
      500
    );
    return () => clearTimeout(timeout);
  }, [queryOptions]);
  useEffect(() => {
    const timeout = setTimeout(
      () => setDataFetcher((prev) => ({ ...prev, page })),
      500
    );
    return () => clearTimeout(timeout);
  }, [page]);
  const { data, isLoading } = useGetBooks(dataFetcher);
  return !filterOptions ? (
    <></>
  ) : (
    <div className={style["search"]}>
      <Filter onChange={(params) => setQueryOptions(params)}></Filter>
      <section className={style["search-results"]}>
        <h2>Search results</h2>
        <ul className={style["search-results__list"]}>
          {isLoading && <Loading></Loading>}
          {!isLoading &&
            data?.products &&
            data.products.map((product) => (
              <li key={product.id}>
                <FeaturedProduct product={product} />
              </li>
            ))}
        </ul>
        <nav className={style["pagination"]}>
          {!isLoading && data && (
            <Pagination
              onChange={(page) => {
                setPage(page);
              }}
              currentPage={page}
              pageCount={data.totalPages}
            ></Pagination>
          )}
        </nav>
      </section>
    </div>
  );
};

export default Search;
