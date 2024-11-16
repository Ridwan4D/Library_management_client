import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-deep-navy-blue text-soft-beige shadow-md">
      <div className="container mx-auto px-4 py-0 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/duv5fiurz/image/upload/v1731772798/book-site-high-resolution-logo_ty3y8h.png" // Replace with your logo URL
            alt="Library Logo"
            className="h-20 w-20"
          />
          <Link to="/" className="text-xl font-bold">
            Library Management
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-crimson-red">
            Home
          </Link>
          <Link to="/add-book" className="hover:text-crimson-red">
            Add Book
          </Link>
          <Link to="/all-books" className="hover:text-crimson-red">
            All Books
          </Link>
          <Link to="/borrowed-books" className="hover:text-crimson-red">
            Borrowed Books
          </Link>
          {user ? (
            <>
              <button
                onClick={onLogout}
                className="bg-crimson-red text-white px-4 py-2 rounded hover:bg-opacity-80"
              >
                Logout
              </button>
              <span className="text-sm font-medium">Welcome, {user.name}</span>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-crimson-red text-white px-4 py-2 rounded hover:bg-opacity-80"
            >
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open Menu</span>
          <svg
            className="h-6 w-6 text-soft-beige"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-deep-navy-blue text-soft-beige">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-crimson-red hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/add-book"
            className="block px-4 py-2 hover:bg-crimson-red hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Add Book
          </Link>
          <Link
            to="/all-books"
            className="block px-4 py-2 hover:bg-crimson-red hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            All Books
          </Link>
          <Link
            to="/borrowed-books"
            className="block px-4 py-2 hover:bg-crimson-red hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Borrowed Books
          </Link>
          {user ? (
            <>
              <button
                onClick={onLogout}
                className="block px-4 py-2 text-left hover:bg-crimson-red hover:text-white"
              >
                Logout
              </button>
              <span className="block px-4 py-2 text-sm font-medium">
                Welcome, {user.name}
              </span>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-crimson-red hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
