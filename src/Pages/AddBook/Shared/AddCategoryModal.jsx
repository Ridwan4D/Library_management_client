import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import useCategories from "../../../Hooks/useCategories";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const AddCategoryModal = ({ isOpen, onClose }) => {
  const axiosPublic = useAxiosPublic();
  const { categories,refetch } = useCategories();
  // console.log(categories);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddCategory = (data) => {
    const categoryInfo = {
      category: data.category.toLowerCase(),
    };
    console.log(categoryInfo);
    axiosPublic
      .post("/categories", categoryInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Category added");
          refetch();
          reset();
        }
      })
      .catch((err) => {
        console.log(`err=> ${err}`);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-md shadow-lg w-11/12 max-w-4xl overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-indigo-600 text-white">
          <h2 className="text-lg font-semibold">Add New Category</h2>
          <button onClick={onClose} className="text-2xl">
            <MdClose />
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Left Side */}
          <div className="flex-1 p-4 bg-gray-100">
            <h3 className="text-lg font-semibold mb-4">Added Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 bg-gray-200 rounded-md shadow-sm uppercase"
                >
                  {category.category}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex-1 p-4">
            <h3 className="text-lg font-semibold mb-4">Add Category Here </h3>
            <form
              onSubmit={handleSubmit(handleAddCategory)}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  {...register("category", {
                    required: "Category name is required",
                    minLength: {
                      value: 2,
                      message: "Category name must be at least 2 characters",
                    },
                  })}
                  placeholder="Enter category name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
                {errors.categoryName && (
                  <p className="text-sm text-red-600">
                    {errors.categoryName.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-5 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
AddCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddCategoryModal;
