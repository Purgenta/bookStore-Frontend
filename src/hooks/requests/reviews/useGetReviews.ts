import { Review } from "../../../types/review";
import useSWR from "swr";
import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
type ReviewResponse = {
  reviews: Review[];
  hasNextPage: boolean;
  canReview: boolean;
};
const useGetReviews = (product_id: number, page: number) => {
  const axios = useAuthenticatedAxios();
  const key = `review/reviewsByProduct/${product_id}?page=${page}`;
  const getReview = async () => {
    const reviewsResponse = (await axios.get(key)).data as ReviewResponse;
    return reviewsResponse;
  };
  const { data, mutate } = useSWR(
    () => [product_id, page],
    () => getReview(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, mutate };
};
export default useGetReviews;
