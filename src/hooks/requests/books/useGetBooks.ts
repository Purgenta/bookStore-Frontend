import axios from "../../../axios/publicAxiosInstance";
import { Product } from "../../../components/FeaturedProduct/FeaturedProduct";
import useSWR from "swr";
export type QueryParams = {
  page: number;
  priceLb: number;
  priceUb: number;
  orderBy: string;
  sort: string;
  genres: string[];
};
type Response = {
  products: Product[];
  totalPages: number;
};
const useGetBooks = (params: QueryParams) => {
  const getBooks = async () => {
    const response = await axios.get("product/filteredProducts", {
      params,
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
