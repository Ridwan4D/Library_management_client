/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import useReviews from "../../../Hooks/useReviews";
import { Link } from "react-router-dom";

const Testimonial = () => {
  const { reviews } = useReviews();
  const [showAll, setShowAll] = useState(false);

  // Decide how many reviews to show initially
  const reviewsToShow = showAll ? reviews.slice(0, 10) : reviews.slice(0, 4);

  return (
    <div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-5">
      <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-12 md:py-10 text-gray-800">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 text-gray-600">
              What people <br /> are saying.
            </h1>
            <h3 className="text-lg md:text-xl mb-5 font-light">
              Real reviews from users of our library site.
            </h3>
            <div className="text-center mb-10">
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 justify-center">
            {reviewsToShow.length > 0 ? (
              reviewsToShow.map((review, index) => (
                <Link
                to={`/bookDetails/${review?.bookId}`}
                key={index} className="px-3 mb-6 md:w-1/3 lg:w-1/4 hover:scale-105 transition-all">
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img
                          src={review.image || "https://via.placeholder.com/40"}
                          alt={`Reviewer ${index + 1}`}
                        />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600">
                          {review.name}
                        </h6>
                      </div>
                    </div>
                    {review.bookName && (
                      <p className="text-xs text-gray-500">
                        <span className="font-bold">Book:</span>{" "}
                        {review.bookName}
                      </p>
                    )}
                    <p className="text-sm leading-tight my-2">
                      "{review.review.slice(0,200)}..."
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
          <div className="text-center">
            {reviews.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 focus:outline-none"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
