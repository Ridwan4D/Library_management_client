import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icons for show/hide
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        toast.success("Logged In");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          setLoginErr("Invalid User or Password");
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login | Library Management System</title>
      </Helmet>
      <div className="flex h-screen">
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center">
            <img
              src="https://i.ibb.co/Bz0ZbM8/login.jpg"
              alt="Login Illustration"
            />
          </div>
        </div>
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-4xl font-semibold mb-6 text-black text-center">
              Login Here
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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  {...register("email", { required: true })}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                {errors.email && (
                  <span className="text-sm text-red-600 font-semibold">
                    Email is required
                  </span>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="password"
                  {...register("password", { required: true })}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </span>
                {errors.password && (
                  <span className="text-sm text-red-600 font-semibold">
                    Password is required
                  </span>
                )}
              </div>
              {loginErr && <p className="text-sm text-red-600">{loginErr}</p>}
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                No Account Yet?{" "}
                <Link to="/register" className="text-black hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
