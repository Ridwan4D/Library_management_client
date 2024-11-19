import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useBorrowBook = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: borrowBooks = [], refetch } = useQuery({
    queryKey: ["borrowBook"],
    queryFn: async () => {
      const result = await axiosPublic.get("/borrowBooks");
      return result.data;
    },
  });
  const theUserBorrowBooks = borrowBooks.filter(
    (book) => book?.addMail === user?.email
  );
  return { borrowBooks, theUserBorrowBooks, refetch };
};

export default useBorrowBook;
