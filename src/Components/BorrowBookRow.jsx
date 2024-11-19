import PropType from "prop-types";
import useBooks from "../Hooks/useBooks";
import { Link } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const BorrowBookRow = ({ book, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const { books } = useBooks();
  const theBook = books.find((aBook) => aBook?._id === book?.mainBookId);

  const handleReturn = (id) => {
    if (!id || !theBook?._id) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#38bdf8", // Light blue (Teal-400)
      cancelButtonColor: "#f44336", // Custom red color for cancel button
      confirmButtonText: "Yes, return it!",
      customClass: {
        title: "text-xl font-bold text-gray-800",
        htmlContainer: "text-sm text-gray-600",
        confirmButton:
          "bg-teal-500 hover:bg-teal-400 focus:outline-none px-4 py-2 rounded-lg",
        cancelButton:
          "bg-gray-500 hover:bg-gray-400 focus:outline-none px-4 py-2 rounded-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the borrow record
        axiosPublic.delete(`/borrowBooks/${id}`).then((res) => {
          if (res.data.deletedCount) {
            // Increment the book quantity
            axiosPublic
              .patch(`/books/${theBook._id}`, {
                quantity: theBook.quantity + 1,
              })
              .then(() => {
                Swal.fire({
                  title: "Returned!",
                  text: "The book has been returned successfully and quantity updated.",
                  icon: "success",
                  confirmButtonText: "Okay",
                  confirmButtonColor: "#4caf50", // Success button color
                  customClass: {
                    title: "text-lg font-semibold text-gray-800",
                    htmlContainer: "text-sm text-gray-600",
                    confirmButton:
                      "bg-teal-500 hover:bg-teal-400 focus:outline-none px-4 py-2 rounded-lg",
                  },
                });
                refetch();
              })
              .catch((err) => {
                console.error("Error updating book quantity:", err);
                Swal.fire({
                  title: "Error",
                  text: "Could not update the book quantity.",
                  icon: "error",
                  confirmButtonText: "Okay",
                  confirmButtonColor: "#f44336",
                });
              });
          }
        });
      }
    });
  };

  if (!theBook) return null; // Handle missing book data gracefully

  const returnDate = new Date(book?.returnDate);
  const isOverdue = returnDate && returnDate < new Date();

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="px-4 py-2">
        <img
          src={theBook?.image || "https://via.placeholder.com/150"}
          alt={theBook?.book || "Book Image"}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td className="px-4 py-2">{theBook?.book}</td>
      <td className="px-4 py-2">{theBook?.author}</td>
      <td className="px-4 py-2">{book?.borrowDate}</td>
      <td className="px-4 py-2">{book?.returnDate}</td>
      <td className="px-4 py-2">
        {isOverdue ? (
          <span className="text-red-500 font-semibold">Overdue</span>
        ) : (
          <span className="text-green-500 font-semibold">On Time</span>
        )}
      </td>
      <td className="px-4 py-2 flex items-center justify-center gap-x-2">
        <Link
          to={`/bookDetails/${theBook?._id}`}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Details
        </Link>
        <button
          onClick={() => handleReturn(book?._id)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Return
        </button>
      </td>
    </tr>
  );
};

BorrowBookRow.propTypes = {
  book: PropType.object,
  refetch: PropType.func,
};

export default BorrowBookRow;
