import { NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Nav = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addBook">Add Book</NavLink>
      </li>
      <li>
        <NavLink to="/allBooks">All Book</NavLink>
      </li>
      <li>
        <NavLink to="/borrowedBook">Borrowed Book</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky bg-[#f7f7f9] shadow-lg" id="nav">
      <div className="navbar-start w-full lg:w-1/4">
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
        <h2 className="text-lg: md:text-2xl font-semibold text-teal-600">
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
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="avatar cursor-pointer">
              <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} alt="User Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white rounded-box shadow p-2 mt-2 w-40"
            >
              <li>
                <button
                  className="text-left text-red-500 font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
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
