import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons for show/hide password
import SocialLogin from "../../Components/SocialLogin";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const Register = () => {
  const { signUpUser } = useAuth();
  const navigate = useNavigate(); // Initialize the navigate function
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", uploadPreset);

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;

      const userCredential = await signUpUser(data.email, data.password);
      await updateProfile(userCredential.user, {
        displayName: data.name,
        photoURL: imageUrl,
      });

      // Save user data in the database
      // const userInfo = {
      //   userName: data.name,
      //   userEmail: data.email,
      //   userImage: imageUrl,
      // };
      // console.log(userInfo);

      // Navigate to the home page after successful registration
      navigate("/"); // Redirect to the home page

      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Password validation regex (at least one lowercase, one uppercase, one number, one special character, and minimum 8 characters)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  return (
    <div>
      <Helmet>
        <title>Register | Library Management System</title>
      </Helmet>
      <div className="flex h-screen flex-row-reverse">
        {/* Left Pane */}
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center">
            <img src="https://i.ibb.co/Ybx2VfG/Mobile-login.jpg" alt="" />
          </div>
        </div>
        {/* Right Pane */}
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-4xl font-semibold mb-6 text-black text-center">
              Sign Up
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Welcome Back To Your Place
            </h1>
            <SocialLogin />
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>or with email</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  {...register("name", { required: true })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none"
                />
                {errors.name && (
                  <span className="text-sm text-red-600 font-semibold">
                    Name is required
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="file_input"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  id="file_input"
                  className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer"
                />
                {errors.image && (
                  <span className="text-sm text-red-600 font-semibold">
                    Image is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  {...register("email", { required: true })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none"
                />
                {errors.email && (
                  <span className="text-sm text-red-600 font-semibold">
                    Email is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: true,
                      pattern: passwordRegex,
                    })}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-sm text-red-600 font-semibold">
                    {errors.password.type === "required"
                      ? "Password is required"
                      : "Password must contain at least 8 characters, one uppercase, one number, and one special character"}
                  </span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-black hover:underline">
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
