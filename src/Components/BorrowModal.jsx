import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const BorrowModal = ({ isOpen, onClose, book }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    const borrowInfo = {
      mainBookId: book?._id,
      returnDate: data.date,
      borrowDate: currentDate,
      name: user?.displayName,
      addMail: user?.email,
    };
    console.log(borrowInfo);
    axiosPublic.post("/borrowBooks", borrowInfo).then((res) => {
      if (res.data.insertedId) {
        const updateQuantity = parseInt(book?.quantity) - 1;
        const quantityInfo = { updateQuantity };
        axiosPublic.patch(`/books/${book?._id}`, quantityInfo).then((res) => {
          if (res.data.modifiedCount) {
            toast.success("Book add to borrow");
          }
        });
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Borrow Book</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Return Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Return Date
            </label>
            <input
              type="date"
              {...register("date", {
                required: "Date is required",
                validate: {
                  notPastDate: (value) => {
                    // Check if the return date is not in the past
                    if (new Date(value) < new Date(currentDate)) {
                      return "Return date cannot be in the past";
                    }
                    return true;
                  },
                },
              })}
              defaultValue={currentDate} // Set current date as default
              className={`w-full p-2 border rounded ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              {...register("name")}
              className="w-full p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              {...register("email")}
              className="w-full p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-400"
          >
            Borrow
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full py-2 mt-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

BorrowModal.propTypes = {
  book: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default BorrowModal;
