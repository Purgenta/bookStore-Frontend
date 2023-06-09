import axios from "../../../axios/publicAxiosInstance";
import { Product } from "../../../types/product";
import useSWR from "swr";
export type QueryParams = {
  page: number;
  priceLb: number;
  priceUb: number;
  orderBy: string;
  sort: string;
  genres: string[];
  publishedDateLb: string;
  publishedDateUb: string;
  q: string;
  publishers: string[];
};
type Response = {
  products: Product[];
  totalPages: number;
};
const useGetBooks = (params: QueryParams) => {
  const getBooks = async () => {
    const response = await axios.post("product/filteredProducts", {
      ...params,
    });
    return response.data as Response;
  };
  const { data, isLoading } = useSWR(
    () => params,
    () => getBooks(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, isLoading };
};
export default useGetBooks;
