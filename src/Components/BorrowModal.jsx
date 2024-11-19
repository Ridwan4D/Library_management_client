import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BorrowModal = ({ isOpen, onClose, theBook }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  if (!isOpen || !theBook) return null; // Ensure the modal does not render if theBook is not provided

  const handleFormSubmit = (data) => {
    if (!theBook?._id || !theBook?.quantity) {
      toast.error("Book information is missing.");
      return;
    }

    const borrowInfo = {
      mainBookId: theBook._id,
      returnDate: data.date,
      borrowDate: currentDate,
      name: user?.displayName,
      addMail: user?.email,
    };

    // POST request to borrow the book
    axiosPublic
      .post("/borrowBooks", borrowInfo)
      .then((res) => {
        if (res.data.insertedId) {
          const updateQuantity = { quantity: parseInt(theBook.quantity) - 1 };
          axiosPublic
            .patch(`/books/${theBook._id}`, updateQuantity)
            .then((res) => {
              if (res.data.modifiedCount) {
                toast.success("Book added to borrow");

                // Redirect after successful borrowing
                setTimeout(() => {
                  navigate("/borrowedBook");
                }, 1000);
              }
            })
            .catch((error) => {
              console.error("Error updating quantity:", error);
              toast.error("Failed to update book quantity.");
            });
        }
      })
      .catch((error) => {
        console.error("Error borrowing book:", error);
        toast.error("Failed to borrow the book.");
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
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison
                    if (new Date(value) < today) {
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  theBook: PropTypes.object.isRequired,
};

export default BorrowModal;
