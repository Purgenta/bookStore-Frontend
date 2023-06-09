import useSWR from "swr";
import { DetailedProduct } from "../../../types/product";
import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
type Response = {
  product: DetailedProduct;
  canReview: boolean;
};
const useGetBookById = (id: number | string) => {
  const axios = useAuthenticatedAxios();
  const getProduct = async () => {
    const productById = (await axios.get(`product/${id}`)).data as Response;
    return productById;
  };
  const { data } = useSWR(
    () => `product/${id}`,
    () => getProduct(),
    {
      refreshInterval: 90000,
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data };
};
export default useGetBookById;
