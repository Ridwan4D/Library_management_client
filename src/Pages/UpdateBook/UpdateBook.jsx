import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import useBooks from "../../Hooks/useBooks";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useCategories from "../../Hooks/useCategories";
import { Helmet } from "react-helmet";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const UpdateBook = () => {
  const { id } = useParams();
  const { books, refetch } = useBooks();
  const { categories } = useCategories();
  const axiosPublic = useAxiosPublic();
  const updateBook = books.find((book) => book?._id === id);

  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (updateBook) {
      setValue("book", updateBook.book);
      setValue("bookDescription", updateBook.bookDescription);
      setValue("quantity", updateBook.quantity);
      setValue("rating", updateBook.rating);
      setValue("bookCategory", updateBook.bookCategory);
      setValue("author", updateBook.author);
      setImagePreview(updateBook.image);
      setImageUrl(updateBook.image);
    }
  }, [updateBook, setValue]);

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

  const handleUpdateBook = async (data) => {
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
    };

    // console.log(bookInfo);
    axiosPublic
      .put(`/books/${updateBook?._id}`, bookInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Book Updated Successfully!");
          refetch();
          setTimeout(() => {
            navigate("/allBooks");
          }, 1000);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <div className="px-1 mx-auto max-w-6xl">
      <Helmet>
        <title>Update Book | Library Management System</title>
      </Helmet>
      <h2 className="mb-8 text-2xl lg:text-4xl font-bold text-center text-gray-800">
        Update Book
      </h2>
      <div className="bg-gray-50 p-2 lg:p-8 rounded-md shadow-lg">
        <form
          onSubmit={handleSubmit(handleUpdateBook)}
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
                defaultValue={updateBook?.bookCategory || ""}
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
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
