import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Slider = () => {
  // Array with real book information
  const books = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      description:
        "A psychological thriller about a woman who shoots her husband and then stops speaking.",
      imageUrl:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1731928794/download_7_iwsh6i.jpg",
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Adventure, Fiction",
      description:
        "A philosophical book about a young shepherd’s journey to find treasure and his true purpose.",
      imageUrl:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1731928657/download_6_vgev5v.jpg",
    },
    {
      id: 3,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      genre: "Mystery, Drama",
      description:
        "A suspenseful mystery about a young woman who grows up isolated in the swamps of North Carolina.",
      imageUrl:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1731928273/download_3_fewyr4.jpg",
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian, Political Fiction",
      description:
        "A dystopian novel about a totalitarian society ruled by Big Brother and the Party.",
      imageUrl:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1731928273/download_4_uon6ia.jpg",
    },
    {
      id: 5,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction, Classic",
      description:
        "A classic novel of the Jazz Age about the tragic story of Jay Gatsby and his pursuit of Daisy Buchanan.",
      imageUrl:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1731928604/images_2_sde2hg.jpg",
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper z-10"
    >
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <div className="flex flex-col lg:flex-row items-center justify-between p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-300">
            {/* Left: Book Image */}
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-32 md:h-64 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Right: Book Info */}
            <div className="w-full lg:w-1/2 lg:pl-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {book.title}
              </h3>
              <p className="mt-2 text-gray-600">By {book.author}</p>
              <p className="mt-1 text-gray-500 italic">Genre: {book.genre}</p>
              <p className="mt-4 text-gray-500">{book.description}</p>
              <Link
                to="/allBooks"
                className="btn mt-4 px-6 py-2 text-white bg-indigo-500 rounded-full hover:bg-teal-700 transition-colors duration-300"
              >
                See More
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
