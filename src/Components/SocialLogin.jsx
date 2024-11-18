import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const SocialLogin = () => {
  const { singUpWithApp } = useAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSocialLogin = (provider) => {
    singUpWithApp(provider)
      .then(() => {
        toast.success("Logged in successfully");
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.error("Social login failed:", error);
        toast.error("Login failed. Please try again.");
      });
  };

  return (
    <div>
      <div className="mt-4 flex items-center justify-center">
        <div className="w-full">
          <button
            type="button"
            onClick={() => handleSocialLogin(googleProvider)}
            className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.15 0 5.95 1.12 8.18 2.94l6.09-6.09C34.9 3.24 29.77 1 24 1 14.06 1 5.67 7.8 2.58 16.84l7.15 5.56C11.45 14.66 17.23 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.58 20H24v8.5h12.8c-1.2 3.94-4.17 7.17-8.3 8.5l6.6 5.13c3.87-3.57 6.45-8.83 6.45-15C41.5 24 39.8 21.45 46.58 20z"
              />
              <path
                fill="#4A90E2"
                d="M5.42 24c0-2.33.58-4.52 1.6-6.44l-7.1-5.57C-1.55 16.86 0 20.46 0 24s1.55 7.14 3.92 11l7.1-5.57c-1.02-1.92-1.6-4.11-1.6-6.44z"
              />
              <path
                fill="#FBBC05"
                d="M24 38.5c-6.77 0-12.55-5.16-14.42-12.06l-7.15 5.56C5.67 40.2 14.06 47 24 47c5.77 0 10.9-2.24 14.27-5.81l-6.6-5.13C29.95 37.38 27.15 38.5 24 38.5z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
