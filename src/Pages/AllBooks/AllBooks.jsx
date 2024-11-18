import { useState } from "react";
import useBooks from "../../Hooks/useBooks";
import useCategories from "../../Hooks/useCategories";
import BookCard from "../../Components/BookCard ";

const AllBooks = () => {
  const { books } = useBooks();
  const { categories } = useCategories();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAvailabilityChange = () => {
    setShowAvailableOnly(!showAvailableOnly);
  };

  const filteredBooks = books.filter((book) => {
    const isCategoryMatch =
    !selectedCategory || book.bookCategory === selectedCategory;
    const isAvailable = !showAvailableOnly || book.quantity > 0;
    return isCategoryMatch && isAvailable;
  });

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
        {filteredBooks && filteredBooks.length > 0 ? (
          filteredBooks.map((book, idx) => <BookCard key={idx} book={book} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No books available.
          </p>
        )}
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
              {/* Category Filter */}
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
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  {categories &&
                    categories.map((category, idx) => (
                      <option key={idx} value={category.category} className="uppercase">
                        {category.category}
                      </option>
                    ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="availability"
                  checked={showAvailableOnly}
                  onChange={handleAvailabilityChange}
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="availability"
                  className="text-sm font-medium text-gray-700"
                >
                  Show Available Only
                </label>
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
