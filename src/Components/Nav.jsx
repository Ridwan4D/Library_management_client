import { NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Nav = () => {
  const { user } = useAuth();

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addBook">Add Book</NavLink>
      </li>
      <li>
        <NavLink to="/allBook">All Book</NavLink>
      </li>
      <li>
        <NavLink to="/borrowedBook">Borrowed Book</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky bg-[#f7f7f9] shadow-lg" id="nav">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <a href="/" className="text-xl font-semibold text-[#1a1f36]">
          <img
            src="https://res.cloudinary.com/duv5fiurz/image/upload/v1731772798/book-site-high-resolution-logo_1_m0vnd5.png"
            alt="Book Site Logo"
            className="h-16 w-24"
          />
        </a>
      </div>
      <div className="navbar-center">
        <h2 className="text-2xl font-semibold text-teal-600">
          L<sub className="text-sm">ibrary</sub> M
          <sub className="text-sm">anagement</sub> S
          <sub className="text-sm">ystem</sub>
        </h2>
      </div>

      <div className="navbar-end hidden lg:flex items-center space-x-4">
        <ul className="menu menu-horizontal px-2 space-x-4 font-semibold">
          {navLinks}
        </ul>
        {/* Conditional Avatar or Login Button */}
        {user ? (
          <div className="avatar">
            <span className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
              <img src={user.photoURL} alt="User Avatar" />
            </span>
          </div>
        ) : (
          <NavLink
            to="/register"
            className="btn bg-slate-200 py-2 px-5 text-gray-500 font-semibold"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
