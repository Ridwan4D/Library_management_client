import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBorrowBook = () => {
  const axiosPublic = useAxiosPublic();
  const { data: borrowBooks = [], refetch } = useQuery({
    queryKey: ["borrowBook"],
    queryFn: async () => {
      const result = await axiosPublic.get("/borrowBooks");
      return result.data;
    },
  });
  return { borrowBooks, refetch };
};

export default useBorrowBook;
