import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { TiDelete } from "react-icons/ti";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const AddBook = () => {
  const { user } = useAuth();
  const { email } = user;
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await axiosPublic.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        setImageUrl(response.data.secure_url);
        setImagePreview(response.data.secure_url);
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
      }
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setImageUrl(""); // Clear the image URL
    document.getElementById("image-input").value = ""; // Clear the input field
  };

  const handleAddBook = async (data) => {
    const { book, bookDescription, quantity, rating, bookCategory, author } =
      data;

    if (parseInt(quantity) < 0) {
      toast.error("Invalid Quantity Number");
      return;
    }

    const bookInfo = {
      image: imageUrl, // Using the Cloudinary image URL
      book,
      bookDescription,
      quantity,
      rating,
      bookCategory,
      author,
      email,
    };

    console.log(bookInfo);
    // try {
    //   const response = await axiosPublic.post("/addBooks", bookInfo);
    //   toast.success("Book Added Successfully!");
    //   setTimeout(() => {
    //     navigate("/allBooks");
    //   }, 1000);
    // } catch (error) {
    //   toast.error("Something went wrong, please try again.");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mx-auto max-w-6xl">
      <h2 className="mb-8 text-4xl font-bold text-center text-gray-800">
        Add a New Book
      </h2>
      <div className="bg-white p-8 rounded-md shadow-lg">
        <form onSubmit={handleSubmit(handleAddBook)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Image Input */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Image Upload
              </label>
              <input
                type="file"
                id="image-input"
                onChange={handleImageUpload}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="w-20 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs rounded-full"
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
              <label className="block text-lg font-semibold text-gray-700">
                Book Name
              </label>
              <input
                type="text"
                {...register("book", { required: "This field is required" })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Book Name"
              />
              {errors.book && (
                <p className="text-sm text-red-600">{errors.book.message}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                {...register("quantity", {
                  required: "This field is required",
                })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
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
              <label className="block text-lg font-semibold text-gray-700">
                Author
              </label>
              <input
                type="text"
                {...register("author", { required: "This field is required" })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Author Name"
              />
              {errors.author && (
                <p className="text-sm text-red-600">{errors.author.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Category
              </label>
              <select
                {...register("bookCategory", {
                  required: "This field is required",
                })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Thriller">Thriller</option>
                <option value="History">History</option>
                <option value="Drama">Drama</option>
                <option value="Novel">Novel</option>
                <option value="Fiction">Fiction</option>
                <option value="Other">Other</option>
              </select>
              {errors.bookCategory && (
                <p className="text-sm text-red-600">
                  {errors.bookCategory.message}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Rating (1-5)
              </label>
              <input
                type="text"
                {...register("rating", { required: "This field is required" })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Rating (1-5)"
              />
              {errors.rating && (
                <p className="text-sm text-red-600">{errors.rating.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-lg font-semibold text-gray-700">
                Description
              </label>
              <textarea
                rows="5"
                {...register("bookDescription", {
                  required: "This field is required",
                })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
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
    </div>
  );
};

export default AddBook;
