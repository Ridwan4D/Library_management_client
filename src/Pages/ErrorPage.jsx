import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <section className="text-center p-10">
        <h2 className="text-9xl font-extrabold text-gray-300 dark:text-gray-700 mb-6">
          404
        </h2>
        <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Oops! Page not found
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you’re looking for doesn’t exist. It might have been
          removed or renamed.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-lg font-semibold text-white transition-colors bg-indigo-600 rounded shadow hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          Back to Homepage
        </Link>
      </section>
    </div>
  );
};

export default ErrorPage;
