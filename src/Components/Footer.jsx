import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import useCategories from "../Hooks/useCategories";
import { Link } from "react-router-dom";
import { useState } from "react";
import useBooks from "../Hooks/useBooks";

const Footer = () => {
  const { books } = useBooks();
  const { categories } = useCategories();
  const [showAll, setShowAll] = useState(false);

  // Toggle to show all categories
  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  // get books by category
  const thrillerBooks = books.filter(
    (book) => book.bookCategory === "thriller"
  );
  const scienceFictionBooks = books.filter(
    (book) => book.bookCategory === "science fiction"
  );
  const historicalFictionBooks = books.filter(
    (book) => book.bookCategory === "historical fiction"
  );

  return (
    <div className="bg-gradient-to-t from-gray-900 to-teal-900">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-medium tracking-wide text-gray-300">
                Category
              </p>
              <ul className="mt-2 space-y-2">
                {categories
                  .slice(0, showAll ? categories.length : 4)
                  .map((cat, idx) => (
                    <li key={idx}>
                      <Link
                        to={`/category/${cat?.category}`}
                        className="text-gray-500 transition duration-300 hover:text-teal-400 hover:underline"
                      >
                        {cat?.category}
                      </Link>
                    </li>
                  ))}
              </ul>
              {categories.length > 4 && (
                <button
                  onClick={handleShowMore}
                  className="mt-2 text-teal-500 hover:text-teal-700 transition-colors duration-300"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            <div>
              <p className="font-medium tracking-wide text-gray-300">
                Thriller
              </p>
              <ul className="mt-2 space-y-2">
                {thrillerBooks.map((book, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/bookDetails/${book?._id}`}
                      className="text-gray-500 transition duration-300 hover:text-teal-400 hover:underline"
                    >
                      {book.book.slice(0, 22)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide text-gray-300">
                Science Fiction
              </p>
              <ul className="mt-2 space-y-2">
                {scienceFictionBooks.map((book, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/bookDetails/${book?._id}`}
                      className="text-gray-500 transition duration-300 hover:text-teal-400 hover:underline"
                    >
                      {book.book.slice(0, 22)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide text-gray-300">
                Historical Fiction
              </p>
              <ul className="mt-2 space-y-2">
                {historicalFictionBooks.map((book, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/bookDetails/${book?._id}`}
                      className="text-gray-500 transition duration-300 hover:text-teal-400 hover:underline"
                    >
                      {book.book.slice(0, 22)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:max-w-md lg:col-span-2">
            <span className="text-base font-medium tracking-wide text-gray-300">
              Subscribe for updates
            </span>
            <form className="flex flex-col mt-4 md:flex-row">
              <input
                placeholder="Email"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-teal-400 focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 hover:bg-teal-700 focus:shadow-outline focus:outline-none"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-500">
              Subscribe and become a member of Book Site, to get all updates
              from us.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
          <p className="text-sm text-gray-500">
            © Copyright 2024 Book Site. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-teal-400"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-teal-400"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-teal-400"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
