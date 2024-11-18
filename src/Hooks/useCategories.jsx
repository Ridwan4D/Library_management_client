import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {
  const axiosPublic = useAxiosPublic();
  const { data: categories = [], refetch } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const result = await axiosPublic.get("/categories");
      return result.data;
    },
  });
  return { categories, refetch };
};

export default useCategories;
