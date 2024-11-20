import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const Nav = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dropdownRef = useRef(null);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown when clicking outside the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".avatar")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addBook">Add Book</NavLink>
      </li>
      <li>
        <NavLink to="/allBooks">All Books</NavLink>
      </li>
      <li>
        <NavLink to="/borrowedBook">Borrowed Books</NavLink>
      </li>
      {user ? (
        <li className="relative z-50 hidden md:block" ref={dropdownRef}>
          <button
            tabIndex={0}
            className="avatar cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing the dropdown when clicking the button
              toggleDropdown();
            }}
          >
            <div className="w-6 h-6 md:w-10 md:h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.photoURL} alt="User Avatar" />
            </div>
          </button>
          <ul
            tabIndex={0}
            className={`menu dropdown-content bg-white rounded-box shadow p-2 mt-2 w-auto absolute right-0 z-50 ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <p>{user?.displayName}</p>
            </li>
            <li>
              <p>{user?.email}</p>
            </li>
            <li>
              <label
                className="flex cursor-pointer gap-2"
                onClick={(e) => e.stopPropagation()} // Prevent the dropdown from collapsing
              >
                <RiSunLine className="text-xl" />
                <input
                  onChange={handleToggle}
                  type="checkbox"
                  value="dark"
                  className="toggle theme-controller"
                  checked={theme === "dark"}
                />
                <RiMoonFill className="text-xl" />
              </label>
            </li>
            <li>
              <button
                className="text-left text-red-500 font-semibold"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the dropdown from collapsing
                  handleLogout();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </li>
      ) : (
        <li>
          <NavLink
            to="/register"
            className="btn bg-slate-200 py-2 px-5 text-gray-500 font-semibold"
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar sticky bg-[#f7f7f9] shadow-lg z-50" id="nav">
      <div className="navbar-start w-full lg:w-1/4">
        {/* Mobile Dropdown */}
        <div className="dropdown z-50">
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
            className="menu menu-sm dropdown-content bg-white rounded-box mt-3 w-52 p-2 shadow"
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
        <h2 className="text-lg: md:text-2xl font-semibold text-teal-600  hidden md:block">
          L<sub className="text-sm">ibrary</sub> M
          <sub className="text-sm">anagement</sub> S
          <sub className="text-sm">ystem</sub>
        </h2>
        <ul className="md:hidden z-10">
          {user ? (
            <li className="relative z-10 md:hidden mr-5">
              <button
                tabIndex={0}
                className="avatar cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown();
                }}
              >
                <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </button>
              <ul
                tabIndex={0}
                className={`menu dropdown-content bg-white rounded-box shadow p-2 mt-2 w-auto absolute right-0 z-10 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <p>{user?.displayName}</p>
                </li>
                <li>
                  <p>{user?.email}</p>
                </li>
                <li>
                  <label
                    className="flex cursor-pointer gap-2"
                    onClick={(e) => e.stopPropagation()} // Prevent the dropdown from collapsing
                  >
                    <RiSunLine className="text-xl" />
                    <input
                      onChange={handleToggle}
                      type="checkbox"
                      value="dark"
                      className="toggle theme-controller"
                      checked={theme === "dark"}
                    />
                    <RiMoonFill className="text-xl" />
                  </label>
                </li>
                <li>
                  <button
                    className="text-left text-red-500 font-semibold"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the dropdown from collapsing
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <NavLink
                to="/register"
                className="btn bg-slate-200 py-2 px-5 text-gray-500 font-semibold"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex items-center space-x-4">
        <ul className="menu menu-horizontal px-2 space-x-4 font-semibold dark:bg-black dark:text-red-500">
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
