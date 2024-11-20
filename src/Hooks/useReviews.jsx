import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviews = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const result = await axiosPublic.get("/reviews");
      return result.data;
    },
  });
  return { reviews, refetch };
};

export default useReviews;
