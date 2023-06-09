import axios from "../../../axios/publicAxiosInstance";
import { Genre } from "../../../types/product";
import useSWR from "swr";
const useGetAllGenres = () => {
  const getGenres = async () => {
    return (await axios.get("product/genres")).data as Genre[];
  };
  const { data } = useSWR(
    () => "product/genres",
    () => getGenres(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data };
};
export default useGetAllGenres;
