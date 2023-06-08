import axios from "../../../axios/publicAxiosInstance";
import useSWR from "swr";
type Genre = {
  name: string;
  id: number;
};
type Publisher = {
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
  publishers: Publisher[];
};

const useGetFilterData = () => {
  const getFilterOptions = async () => {
    const options = (await axios.get("product/filterOptions"))
      .data as FilterOptions;
    return options;
  };
  const { data } = useSWR(
    () => "product/filterOptions",
    () => getFilterOptions(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data };
};
export default useGetFilterData;
