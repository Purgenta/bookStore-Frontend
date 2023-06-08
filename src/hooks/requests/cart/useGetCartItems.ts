import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
import useSWR from "swr";
import { CartResponse } from "../../../types/cart";
const useGetCartItems = () => {
  const axios = useAuthenticatedAxios();
  const getcartItems = async () => {
    const items = (await axios.get("cart/cartItems")).data as CartResponse[];
    return items;
  };
  const { data, mutate } = useSWR(
    () => `cart/cartItems`,
    () => getcartItems(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, mutate };
};
export default useGetCartItems;
