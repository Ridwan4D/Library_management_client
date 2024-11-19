import BorrowBookRow from "../../Components/BorrowBookRow";
import useBorrowBook from "../../Hooks/useBorrowBook";

const BorrowedBook = () => {
  const { theUserBorrowBooks, refetch } = useBorrowBook();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-4 px-4">
          Your Borrowed Books
        </h2>

        {/* Conditional rendering for borrowed books */}
        {theUserBorrowBooks && theUserBorrowBooks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-teal-500 min-h-screen text-white">
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Borrow Date</th>
                  <th className="px-4 py-3">Return Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {theUserBorrowBooks.map((book, index) => (
                  <BorrowBookRow key={index} book={book} refetch={refetch} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-600">
            <p>You have no borrowed books yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowedBook;
