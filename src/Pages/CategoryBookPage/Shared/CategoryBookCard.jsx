import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const CategoryBookCard = ({ book }) => {
  return (
    <Link
      to={`/bookDetails/${book?._id}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <img
        src={book.image}
        alt={book.book}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 hover:text-teal-600 transition duration-200">
          {book.book}
        </h3>
        <p className="text-sm text-gray-600 mt-2">{book.author}</p>
        <p className="text-sm text-gray-500 mt-2">{book.bookDescription}</p>
      </div>
    </Link>
  );
};
CategoryBookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default CategoryBookCard;
