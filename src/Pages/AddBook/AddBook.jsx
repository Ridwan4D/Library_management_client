import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { TiDelete } from "react-icons/ti";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import axios from "axios";
import { MdAddCard } from "react-icons/md";
import AddCategoryModal from "./Shared/AddCategoryModal";
import useCategories from "../../Hooks/useCategories";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const AddBook = () => {
  const { categories } = useCategories();
  const { user } = useAuth();
  const { email } = user;
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        setImageUrl(response.data.secure_url);
        setImagePreview(response.data.secure_url);
      } catch (error) {
        toast.error("Image upload failed. Please try again.", error);
      }
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setImageUrl("");
    document.getElementById("image-input").value = "";
  };

  const handleAddBook = async (data) => {
    const { book, bookDescription, quantity, rating, bookCategory, author } =
      data;

    if (parseInt(quantity) < 0) {
      toast.error("Invalid Quantity Number");
      return;
    }

    const bookInfo = {
      image: imageUrl,
      book,
      bookDescription,
      quantity,
      rating,
      bookCategory,
      author,
      email,
    };

    console.log(bookInfo);
    axiosPublic
      .post("/books", bookInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Book Added Successfully!");
          reset();
          handleDeleteImage();
          setTimeout(() => {
            navigate("/allBooks");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className=" px-1 mx-auto max-w-6xl">
      <div className="flex justify-between items-center bg-gray-200 px-5 py-4 mt-1">
        <h3 className="font-medium md:text-xl lg:text-3xl">Add New Category</h3>
        <button className="text-xl md:text-3xl" onClick={handleOpenModal}>
          <MdAddCard />
        </button>
      </div>
      <h2 className="mb-8 text-2xl lg:text-4xl font-bold text-center text-gray-800">
        Add a New Book
      </h2>
      <div className="bg-gray-50 p-2 lg:p-8 rounded-md shadow-lg">
        <form
          onSubmit={handleSubmit(handleAddBook)}
          className="space-y-3 lg:space-y-6"
        >
          <div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 md:grid-cols-2">
            {/* Image Input */}
            <div>
              <label className="block text-sm md:text-lg font-semibold text-gray-700">
                Image Upload
              </label>
              <input
                type="file"
                id="image-input"
                onChange={handleImageUpload}
                className="w-full px-3 py-1 md:p-3 mt-1 border border-gray-300 rounded-sm md:rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="w-32 max-h-32 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute top-0 left-0 text-white text-sm rounded-full"
                  >
                    <TiDelete />
                  </button>
                </div>
              )}
              {errors.image && (
                <p className="text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>

            {/* Book Name */}
            <div>
              <label className="block text-sm md:text-lg font-semibold text-gray-700">
                Book Name
              </label>
              <input
                type="text"
                {...register("book", { required: "This field is required" })}
                className="w-full px-3 py-1 md:p-3 mt-1 border border-gray-300 rounded-sm md:rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Book Name"
              />
              {errors.book && (
                <p className="text-sm text-red-600">{errors.book.message}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm md:text-lg font-semibold text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                {...register("quantity", {
                  required: "This field is required",
                })}
                className="w-full px-3 py-1 md:p-3 mt-1 border border-gray-300 rounded-sm md:rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Number of Books"
              />
              {errors.quantity && (
                <p className="text-sm text-red-600">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm md:text-lg font-semibold text-gray-700">
                Author
              </label>
              <input
                type="text"
                {...register("author", { required: "This field is required" })}
                className="w-full px-3 py-1 md:p-3 mt-1 border border-gray-300 rounded-sm md:rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Author Name"
              />
              {errors.author && (
                <p className="text-sm text-red-600">{errors.author.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm md:text-lg font-semibold text-gray-700">
                Category
              </label>
              <select
                {...register("bookCategory", {
                  required: "Please select a category",
                })}
                className={`w-full p-3 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 ${
                  errors.bookCategory ? "border-red-600" : "border-gray-300"
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((category, idx) => (
                  <option
                    key={idx}
                    value={category.category}
                    className="uppercase"
                  >
                    {category.category}
                  </option>
                ))}
              </select>
              {errors.bookCategory && (
                <p className="text-sm text-red-600">
                  {errors.bookCategory.message}
                </p>
              )}
            </div>
            {/* Rating */}
            <div>
              <label className="block text-sm md:text-lg font-semibold text-gray-700">
                Rating (1-5)
              </label>
              <input
                type="text"
                {...register("rating", { required: "This field is required" })}
                className="w-full px-3 py-1 md:p-3 mt-1 border border-gray-300 rounded-sm md:rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Rating (1-5)"
              />
              {errors.rating && (
                <p className="text-sm text-red-600">{errors.rating.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm md:text-lg font-semibold text-gray-700">
                Description
              </label>
              <textarea
                rows="5"
                {...register("bookDescription", {
                  required: "This field is required",
                })}
                className="w-full px-3 py-1 md:p-3 mt-1 border border-gray-300 rounded-sm md:rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Write Book Description"
              />
              {errors.bookDescription && (
                <p className="text-sm text-red-600">
                  {errors.bookDescription.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-5 py-3 mt-6 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Add Book
          </button>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <AddCategoryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default AddBook;
