import PropType from "prop-types";
import useBooks from "../Hooks/useBooks";
import { Link } from "react-router-dom";

const BorrowBookRow = ({ book }) => {
  const { books } = useBooks();
  const theBook = books.find((aBook) => aBook?._id === book?.mainBookId);

  const handleReturn = () => {
    // Add return logic here (e.g., API call to mark book as returned)
    console.log("Returning book:", theBook);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {/* Book Image */}
      <td className="px-4 py-2">
        <img
          src={theBook?.image || "/default-image.png"} // Fallback to default image if not available
          alt={theBook?.book || "Book Image"}
          className="w-16 h-16 object-cover rounded"
        />
      </td>

      {/* Book Details */}
      <td className="px-4 py-2">{theBook?.book}</td>
      <td className="px-4 py-2">{theBook?.author}</td>
      <td className="px-4 py-2">{book?.borrowDate}</td>
      <td className="px-4 py-2">{book?.returnDate}</td>

      {/* Status */}
      <td className="px-4 py-2">
        {new Date(book?.returnDate) < new Date() ? (
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
          onClick={handleReturn}
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
};

export default BorrowBookRow;
