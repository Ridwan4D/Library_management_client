import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const { user } = useAuth();
  const theUser = book?.email === user?.email;
  return (
    <div className="p-4 bg-white rounded-md shadow-md hover:shadow-xl transition-all transform hover:scale-105">
      {/* Book Image */}
      <img
        src={book?.image || "https://via.placeholder.com/150"}
        alt={book?.book}
        className="w-full h-48 object-cover rounded-md mb-4 hover:scale-95 transition-all"
      />

      {/* Book Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{book?.book}</h3>

      {/* Author */}
      <p className="text-sm text-gray-600">{book?.author}</p>

      {/* Book Category */}
      <p className="text-sm text-gray-500 mt-1 uppercase">
        {book?.bookCategory}
      </p>

      {/* Buttons Section */}
      <div className="mt-4 flex justify-between gap-2">
        {theUser && (
          <Link
            to={`/updateBook/${book?._id}`}
            className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none transition-colors"
          >
            Update
          </Link>
        )}
        <button className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-700 focus:outline-none transition-colors">
          Details
        </button>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookCard;
