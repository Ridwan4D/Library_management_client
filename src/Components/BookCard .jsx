import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FcViewDetails } from "react-icons/fc";

const BookCard = ({ book }) => {
  const { user } = useAuth();
  const theUser = book?.email === user?.email;

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
    <div className="p-4 bg-white rounded-md shadow-md hover:shadow-xl transition-all transform hover:scale-105">
      {/* Book Image */}
      <img
        src={book?.image || "https://via.placeholder.com/150"}
        alt={book?.book}
        className="w-full h-48 object-cover rounded-md mb-4 hover:scale-95 transition-all"
      />

      {/* Book Title */}
      <h3 className="lg:text-xl font-semibold text-gray-800 mb-2">
        {book?.book}
      </h3>

      {/* Author */}
      <p className="text-sm text-gray-600">{book?.author}</p>

      {/* Book Category */}
      <p className="text-sm text-gray-500 mt-1 uppercase">
        {book?.bookCategory}
      </p>

      {/* Book Rating */}
      <div className="mt-2 text-yellow-500 text-2xl">
        {" "}
        {/* Increase star size here */}
        {book?.rating ? renderStars(book?.rating) : "No rating available"}
      </div>

      {/* Buttons Section */}
      <div className="mt-4 flex justify-between gap-2">
        {theUser && (
          <Link
            to={`/updateBook/${book?._id}`}
            className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none transition-colors"
          >
            <FaPencil />
          </Link>
        )}
        <Link
          to={`/bookDetails/${book?._id}`}
          className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-700 focus:outline-none transition-colors"
        >
          <FcViewDetails />
        </Link>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookCard;
