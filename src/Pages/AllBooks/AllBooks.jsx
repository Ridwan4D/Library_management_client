import { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Import menu icon
import { IoClose } from "react-icons/io5"; // Import close icon
import useBooks from "../../Hooks/useBooks";
import useCategories from "../../Hooks/useCategories";
import useAuth from "../../Hooks/useAuth";
import BookCard from "../../Components/BookCard ";
import BookTable from "../../Components/BookTable";

const AllBooks = () => {
  const { user } = useAuth();
  const { books } = useBooks();
  const { categories } = useCategories();
  const [filterOpen, setFilterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState("card"); // "card" or "table"
  const userMail = books.find((book) => book.email === user.email);

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
    <div className="min-h-screen bg-gray-50 p-1 md:p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6 px-1">
        <h1 className="text-2xl font-bold text-gray-800">All Books</h1>
        <div className="md:hidden">
          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {menuOpen ? <IoClose size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Buttons for larger screens */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-md shadow ${
              viewMode === "card" ? "bg-indigo-700" : "bg-indigo-600"
            } hover:bg-indigo-500`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-md shadow ${
              viewMode === "table" ? "bg-indigo-700" : "bg-indigo-600"
            } hover:bg-indigo-500`}
          >
            Table View
          </button>
          <button
            onClick={handleFilterToggle}
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none"
          >
            Filter Books
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mb-4">
          <button
            onClick={() => setViewMode("card")}
            className={`block w-full text-left px-4 py-2 text-sm font-semibold text-white rounded-md shadow mb-2 ${
              viewMode === "card" ? "bg-indigo-700" : "bg-indigo-600"
            } hover:bg-indigo-500`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`block w-full text-left px-4 py-2 text-sm font-semibold text-white rounded-md shadow mb-2 ${
              viewMode === "table" ? "bg-indigo-700" : "bg-indigo-600"
            } hover:bg-indigo-500`}
          >
            Table View
          </button>
          <button
            onClick={handleFilterToggle}
            className="block w-full text-left px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none"
          >
            Filter Books
          </button>
        </div>
      )}

      {/* Books Section */}
      {viewMode === "card" ? (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-1">
          {filteredBooks && filteredBooks.length > 0 ? (
            filteredBooks.map((book, idx) => <BookCard key={idx} book={book} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No books available.
            </p>
          )}
        </div>
      ) : (
        <section className="container md:px-4 mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Ratings
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Details
                  </th>
                  {user?.email === userMail?.email && (
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredBooks.map((book, idx) => (
                  <BookTable key={idx} book={book} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

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
                      <option key={idx} value={category.category}>
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
