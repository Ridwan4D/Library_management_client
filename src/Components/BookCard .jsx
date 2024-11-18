import PropType from "prop-types";

const BookCard = ({ book }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow">
      <img
        src={book?.image || "https://via.placeholder.com/150"}
        alt={book?.book}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{book?.book}</h3>
      <p className="text-sm text-gray-600 mt-1">{book?.author}</p>
      <p className="text-sm text-gray-500 mt-2">{book?.bookCategory}</p>
    </div>
  );
};
BookCard.propTypes = {
  book: PropType.object,
};
export default BookCard;
