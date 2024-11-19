import { Link } from "react-router-dom";

const CategoryBook = () => {
  // Fake array of categories
  const categories = [
    {
      name: "Thriller",
      description:
        "Dive into the world of suspense and excitement. Thriller books are packed with tension, mystery, and unexpected twists that keep you on the edge of your seat.",
      imageUrl:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1732026816/download_32_klwqf8.jpg",
    },
    {
      name: "Science Fiction",
      description:
        "Explore futuristic worlds, advanced technologies, and space adventures. Science fiction pushes the boundaries of imagination, often set in outer space or advanced societies.",
      imageUrl:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1732026816/download_33_gfnfvj.jpg",
    },
    {
      name: "Mystery",
      description:
        "Mystery novels are centered around solving puzzles or crimes, often featuring detectives and hidden secrets waiting to be uncovered. Each page will leave you guessing.",
      imageUrl:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1732026816/download_34_dm6jlv.jpg",
    },
    {
      name: "Fantasy",
      description:
        "Enter magical worlds full of mythical creatures, epic quests, and powerful heroes. Fantasy books immerse you in incredible adventures that are limited only by imagination.",
      imageUrl:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1732026816/download_35_nsptbr.jpg",
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold text-center text-teal-600 mb-8">
        Explore Book Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            to={`/category/${category.name}`}
            key={category.name}
            className="card bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out"
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 hover:text-teal-500 transition-colors duration-200">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 mt-3">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBook;
