import React, { useEffect, useState } from "react";
import axios from "../../axios/publicAxiosInstance";
import style from "./Search.module.css";
import FeaturedProduct, {
  Product,
} from "../../components/FeaturedProduct/FeaturedProduct";
type Genre = {
  name: string;
  id: number;
};
type ProductExtremes = {
  price: number;
  publishing_date: string;
  page_number: number;
};
type FilterOptions = {
  genres: Genre[];
  productInfo: {
    _min: ProductExtremes;
    _max: ProductExtremes;
  };
};
import Dropdown from "../../components/Dropdown/Dropdown";
import MultiSelect from "../../components/MultiSelect/MutliSelect";
import RangeSlider from "../../components/Inputs/RangeSlider/RangeSlider";
const Search = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [genre, setGenre] = useState([]);
  useEffect(() => {
    const getFilterOptions = async () => {
      try {
        const options = (await axios.get("product/filterOptions"))
          .data as FilterOptions;
        setFilterOptions(options);
      } catch (error) {}
    };
    getFilterOptions();
  }, []);
  return (
    <div className={style["search"]}>
      <aside className={style["filter"]}>
        <ul className={style["filter-options"]}>
          <li>
            <Dropdown label="Sort by">
              <select className={style["select-option"]}>
                <option value="price">Price</option>
                <option value="publishing_date">Publishing date</option>
                <option value="number_of_pages">Number of pages</option>
              </select>
            </Dropdown>
          </li>
          <li>
            <Dropdown label="Sort order">
              <ul className={style["sort-order"]}>
                <li>ASC</li>
                <li>DESC</li>
              </ul>
            </Dropdown>
          </li>
          <li>
            <Dropdown label="Genres">
              {filterOptions && (
                <MultiSelect
                  options={filterOptions.genres.map((genre) => genre.name)}
                  changeHandler={(options) => console.log(options)}
                ></MultiSelect>
              )}
            </Dropdown>
          </li>
          <li>
            {filterOptions && (
              <Dropdown label="Price">
                <RangeSlider
                  labelLower=""
                  labelUpper=""
                  upper={filterOptions.productInfo._max.price}
                  lower={filterOptions.productInfo._min.price}
                  onChange={(lower, upper) => console.log(lower, upper)}
                />
              </Dropdown>
            )}
          </li>
        </ul>
      </aside>
      <section className={style["search-results"]}>
        <h2>Search</h2>
        <ul className={style["search-results__list"]}>
          {products.map((product) => (
            <li key={product.id}>
              <FeaturedProduct product={product} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Search;
