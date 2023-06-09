import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
import useSWR from "swr";
import { Order } from "../../../types/order";
const useGetOrders = () => {
  const axios = useAuthenticatedAxios();
  const getOrders = async () => {
    return (await axios.get(`user/orders`)).data as Order[];
  };
  const { data, mutate } = useSWR(
    () => `user/orders`,
    () => getOrders(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, mutate };
};
export default useGetOrders;
