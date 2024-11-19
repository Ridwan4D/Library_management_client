import { useParams } from "react-router-dom";
import useBooks from "../../Hooks/useBooks";
import BookCard from "../../Components/BookCard ";

const CategoryBookPage = () => {
  const { name } = useParams();
  const { books } = useBooks();

  // Filter books based on the category name
  const filteredBooks = books.filter(
    (book) => book.bookCategory.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Category Title */}
      <h2 className="text-4xl font-bold text-center text-teal-600 mb-10">
        {name.charAt(0).toUpperCase() + name.slice(1)} Books
      </h2>
      {/* Display message when no books are found */}
      {filteredBooks.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No books available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Map over filtered books */}
          {filteredBooks.map((book, idx) => (
            <BookCard key={idx} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBookPage;
