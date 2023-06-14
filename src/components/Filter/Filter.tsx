import React, { useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import RangeSlider from "../Inputs/RangeSlider/RangeSlider";
import style from "./Filter.module.css";
import MultiSelect from "../Inputs/MultiSelect/MutliSelect";
import useGetFilterData from "../../hooks/requests/books/useGetFilterData";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { QueryParams } from "../../hooks/requests/books/useGetBooks";
type Props = {
  onChange: (params: Omit<QueryParams, "page">) => unknown;
  className?: string;
};
const Filter = ({ onChange, className }: Props) => {
  const [sort, setSort] = useState("asc");
  const [price, setPrice] = useState({ priceLb: 0, priceUb: 100000 });
  const [orderBy, setOrderBy] = useState("price");
  const [genres, setGenres] = useState<string[]>([]);
  const [publishers, setPublishers] = useState<string[]>([]);
  const [searchName, setSearchName] = useState("");
  const { data: filterOptions } = useGetFilterData();
  const [date, setDate] = useState<
    | {
        publishingDateLb: Date;
        publishingDateUb: Date;
      }
    | undefined
  >(undefined);
  useEffect(() => {
    if (filterOptions) {
      if (!date) {
        setDate({
          publishingDateLb: new Date(
            filterOptions.productInfo._min.publishing_date
          ),
          publishingDateUb: new Date(
            filterOptions.productInfo._max.publishing_date
          ),
        });
      }
    }
  }, [filterOptions]);
  useEffect(() => {
    if (filterOptions) {
      onChange({
        orderBy,
        sort,
        priceLb: price.priceLb,
        priceUb: price.priceUb,
        publishedDateLb: date?.publishingDateLb.toISOString() || "",
        publishedDateUb: date?.publishingDateUb.toISOString() || "",
        genres,
        q: searchName,
        publishers,
      });
    }
  }, [sort, price, orderBy, date, genres, searchName, publishers]);
  return (
    <aside className={`${style["filter"]} ${className ? className : ""}`}>
      <ul className={style["filter-options"]}>
        <li>
          <input
            className={style["search-name"]}
            type="text"
            name="search name"
            placeholder="search by phrase"
            onChange={(e) => setSearchName(e.target.value)}
          ></input>
        </li>
        <li>
          <Dropdown label="Sort by">
            <select
              className={style["select-option"]}
              onChange={(event) => setOrderBy(event.target.value)}
            >
              <option value="price">Price</option>
              <option value="publishing_date">Publishing date</option>
              <option value="page_number">Number of pages</option>
            </select>
          </Dropdown>
        </li>
        <li>
          <Dropdown label="Sort order">
            <select
              className={style["select-option"]}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value={"asc"}>ASC</option>
              <option value={"desc"}>DESC</option>
            </select>
          </Dropdown>
        </li>
        <li>
          <Dropdown label="Genres">
            {filterOptions && (
              <MultiSelect
                options={filterOptions.genres.map((genre) => ({
                  isChecked: true,
                  label: genre.name,
                  value: genre.id,
                }))}
                changeHandler={(options) => setGenres(options)}
              ></MultiSelect>
            )}
          </Dropdown>
        </li>
        <li>
          <Dropdown label="Publishers">
            {filterOptions && (
              <MultiSelect
                options={filterOptions.publishers.map((publisher) => ({
                  isChecked: true,
                  label: publisher.name,
                  value: publisher.id,
                }))}
                changeHandler={(options) => setPublishers(options)}
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
                onChange={(lower, upper) =>
                  setPrice({ priceLb: lower, priceUb: upper })
                }
              />
            </Dropdown>
          )}
        </li>
        <li>
          {filterOptions && (
            <Dropdown label="Publishing date">
              <div className={style["date-lb"]}>
                <span>Date from</span>
                <div className={style["wrapper"]}>
                  <DatePicker
                    className={style["datepicker"]}
                    selected={
                      date
                        ? date.publishingDateLb
                        : new Date(
                            filterOptions.productInfo._min.publishing_date
                          )
                    }
                    onChange={(date) => {
                      if (!date) return;
                      setDate((prev) => {
                        if (!prev) return prev;
                        else return { ...prev, publishingDateLb: date };
                      });
                    }}
                  ></DatePicker>
                  <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                </div>
              </div>
              <div className={style["date-lb"]}>
                <span>Date to</span>
                <div className={style["wrapper"]}>
                  <DatePicker
                    className={style["datepicker"]}
                    selected={
                      date
                        ? date.publishingDateUb
                        : new Date(
                            filterOptions.productInfo._max.publishing_date
                          )
                    }
                    onChange={(date) => {
                      if (!date) return;
                      setDate((prev) => {
                        if (!prev) return prev;
                        else return { ...prev, publishingDateUb: date };
                      });
                    }}
                  ></DatePicker>
                  <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                </div>
              </div>
            </Dropdown>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Filter;
