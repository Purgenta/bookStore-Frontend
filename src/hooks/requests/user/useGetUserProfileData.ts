import useSwr from "swr";
import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
import { Genre } from "../../../types/product";
type Profile = {
  created_at: Date;
  email: string;
  last_name: string;
  name: string;
  phone_number: string;
  password: string;
  adress: string;
  prefferences: {
    genre: Genre;
  } | null;
};
const useGetProfileData = () => {
  const axios = useAuthenticatedAxios();
  const getProfile = async () => {
    return (await axios.get("user/profile")).data as Profile;
  };
  const { data, mutate } = useSwr(
    () => "user/profile",
    () => getProfile(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, mutate };
};
export default useGetProfileData;
