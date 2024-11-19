import { Link, useParams } from "react-router-dom";
import useBooks from "../../Hooks/useBooks";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import BorrowModal from "../../Components/BorrowModal";
import useBorrowBook from "../../Hooks/useBorrowBook";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { books } = useBooks();
  const { theUserBorrowBooks } = useBorrowBook();
  const [disable, setDisable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find the book by ID
  const book = books.find((book) => book?._id === id);

  // Handle book quantity availability
  useEffect(() => {
    if (book?.quantity < 1) {
      setDisable(true); // Disable borrow button if quantity is 0
    } else {
      setDisable(false); // Enable borrow button if quantity is available
    }
  }, [book]);

  const handleBorrowClick = () => {
    if (
      theUserBorrowBooks.some(
        (borrowedBook) => borrowedBook.mainBookId === book?._id
      )
    ) {
      toast.error("You have already borrowed this book.");
      setDisable(true);
      return;
    }

    if (theUserBorrowBooks.length >= 3) {
      toast.error("Maximum 3 books are borrowable.");
      setDisable(true);
      return;
    }

    setIsModalOpen(true);
  };

  // If book not found, show a message
  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Helmet>
        <title>Book Details | Library Management System</title>
      </Helmet>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Book Image */}
          <div className="w-full lg:w-1/2 bg-gray-100 p-4 flex items-center justify-center">
            <img
              src={book.image || "https://via.placeholder.com/150"}
              alt={book.book}
              className="rounded-lg shadow-lg max-h-96 w-full sm:w-auto object-contain"
            />
          </div>

          {/* Right Side - Book Info */}
          <div className="w-full lg:w-1/2 p-6 md:p-8 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {book.book}
            </h1>
            <p className="text-base sm:text-lg font-medium text-gray-600">
              <span className="text-gray-800 font-semibold">Author:</span>{" "}
              {book.author}
            </p>
            <p className="text-base sm:text-lg font-medium text-gray-600">
              <span className="text-gray-800 font-semibold">Category:</span>{" "}
              {book.bookCategory}
            </p>
            <p className="text-base sm:text-lg font-medium text-gray-600">
              <span className="text-gray-800 font-semibold">Quantity:</span>{" "}
              {book.quantity}
            </p>
            <p className="text-base sm:text-lg font-medium text-gray-600">
              <span className="text-gray-800 font-semibold">Rating:</span>{" "}
              {book.rating}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500 focus:outline-none"
              >
                Go Back
              </button>
              {user?.email === book?.email && (
                <Link
                  to={`/updateBook/${book?._id}`}
                  className="px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-400 focus:outline-none text-center"
                >
                  Update
                </Link>
              )}
              {user?.email !== book?.email && (
                <button
                  onClick={handleBorrowClick}
                  className={`px-4 py-2 rounded-md shadow focus:outline-none ${
                    disable
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-teal-500 hover:bg-teal-400 text-white"
                  }`}
                  disabled={disable}
                >
                  Borrow
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="p-6 md:p-8 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Description
          </h2>
          <p className="text-gray-600 text-base sm:leading-relaxed">
            {book.bookDescription || "No description available for this book."}
          </p>
        </div>
      </div>

      {/* Borrow Modal */}
      <BorrowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theBook={book}
      />
    </div>
  );
};

export default BookDetails;
