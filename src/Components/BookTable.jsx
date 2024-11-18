import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";

const BookTable = ({ book }) => {
  const { user } = useAuth();

  // Function to generate the star rating
  const renderStars = (rating) => {
    const totalStars = 5; // Total number of stars to show
    const filledStars = Math.floor(rating); // Number of filled stars
    const emptyStars = totalStars - filledStars; // Remaining empty stars

    let stars = [];

    // Push filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push("★"); // Filled star
    }

    // Push empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push("☆"); // Empty star
    }

    return stars.join(" "); // Return stars as a string
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <img
          className="h-12 w-12 rounded-md object-cover"
          src={book?.image}
          alt={book?.title}
        />
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
        {book?.title}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">
        {book?.author}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">
        {book?.bookCategory}
      </td>
      <td className="px-6 py-4 text-sm font-bold text-yellow-500">
        {book?.rating ? renderStars(book?.rating) : "No rating available"}
      </td>
      <td
        className={`px-6 py-4 text-sm font-semibold ${
          book?.quantity > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {book?.quantity}
      </td>
      <td className="px-6 py-4">
        <button
          className="text-sm px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => alert(`Details of: ${book?.title}`)}
        >
          Details
        </button>
      </td>
      {user?.email === book?.email && (
        <td className="px-6 py-4">
          <Link
            to={`/updateBook/${book?._id}`}
            className="text-sm px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Update
          </Link>
        </td>
      )}
    </tr>
  );
};

BookTable.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookTable;
