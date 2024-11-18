import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBooks = () => {
  const axiosPublic = useAxiosPublic();
  const { data: books = [], refetch } = useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const result = await axiosPublic.get("/books");
      return result.data;
    },
  });
  return { books, refetch };
};

export default useBooks;
