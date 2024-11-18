import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AddBook from "../Pages/AddBook/AddBook";
import SecureRoute from "./SecureRoute";
import AllBooks from "../Pages/AllBooks/AllBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/addBook",
        element: (
          <SecureRoute>
            <AddBook />
          </SecureRoute>
        ),
      },
      {
        path: "/allBooks",
        element: (
          <SecureRoute>
            <AllBooks />
          </SecureRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
