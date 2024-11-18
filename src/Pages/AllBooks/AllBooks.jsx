import { useState } from "react";
import useBooks from "../../Hooks/useBooks";

const AllBooks = () => {
  const { books } = useBooks();
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Books</h1>
        <button
          onClick={handleFilterToggle}
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600"
        >
          Filter Books
        </button>
      </div>

      {/* Books Section */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Example Book Card */}
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src="https://via.placeholder.com/150"
              alt="Book Cover"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Book Title {idx + 1}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Author Name</p>
            <p className="text-sm text-gray-500 mt-2">Category</p>
          </div>
        ))}
      </div>

      {/* Filter Modal */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Filter Books
            </h3>
            {/* Filter Options */}
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Categories</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="mystery">Mystery</option>
                  <option value="fantasy">Fantasy</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleFilterToggle}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none"
              >
                Apply Filter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
