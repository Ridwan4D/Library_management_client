/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";

const Testimonial = () => {
  const [showAll, setShowAll] = useState(false);

  const testimonials = [
    {
      name: "Sarah Johnson",
      image: "https://i.pravatar.cc/100?img=1",
      review: "The library site has made borrowing books so much easier. The search feature is really intuitive, and I love the option to reserve books online.",
    },
    {
      name: "Alex Martinez",
      image: "https://i.pravatar.cc/100?img=2",
      review: "I appreciate how easy it is to manage my borrowed books and due dates through the website. The reminders are super helpful, and the digital library features are fantastic!",
    },
    {
      name: "Emily Clark",
      image: "https://i.pravatar.cc/100?img=3",
      review: "I recently used the library's online platform to find and borrow some new books for my studies. The user interface is very clean, and everything is easy to navigate. Highly recommend!",
    },
    {
      name: "John Doe",
      image: "https://i.pravatar.cc/100?img=4",
      review: "I've been using this library website for a few months now, and it's been a game-changer. The ability to check book availability and borrow books directly from the site has saved me so much time.",
    },
    {
      name: "Lucy Harper",
      image: "https://i.pravatar.cc/100?img=5",
      review: "This website has made it easier to explore and borrow a variety of books, both physical and digital. The process is seamless, and I love the notifications for new arrivals.",
    },
    {
      name: "Mark Wilson",
      image: "https://i.pravatar.cc/100?img=6",
      review: "As a regular user of the library, I find the website incredibly helpful. I can easily manage my account, renew books, and explore new titles. It's a fantastic resource for book lovers!",
    },
  ];

  const reviewsToShow = showAll ? testimonials : testimonials.slice(0, 3);

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
            {reviewsToShow.map((testimonial, index) => (
              <div key={index} className="px-3 mb-6 md:w-1/3 lg:w-1/4">
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img
                        src={testimonial.image}
                        alt={`Reviewer ${index + 1}`}
                      />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600">
                        {testimonial.name}
                      </h6>
                    </div>
                  </div>
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                    {testimonial.review}
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 focus:outline-none"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
