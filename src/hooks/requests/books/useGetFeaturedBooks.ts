import useSWR from "swr";
import { Product } from "../../../components/FeaturedProduct/FeaturedProduct";
type FeaturedProducts = {
  newestProducts: Product[];
  bestRated: Product[];
};
import axios from "../../../axios/publicAxiosInstance";
const useGetFeaturedBooks = () => {
  const getFeaturedProducts = async () => {
    const featured = (await axios.get("product/showcasedProducts"))
      .data as FeaturedProducts;
    return featured;
  };
  const { data, isLoading } = useSWR(
    () => "product/showcasedProducts",
    () => getFeaturedProducts(),
    {
      refreshInterval: 90000,
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, isLoading };
};
export default useGetFeaturedBooks;
