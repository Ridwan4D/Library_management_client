import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";

const SocialLogin = () => {
  const { singUpWithApp } = useAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const handleSocialLogin = (provider) => {
    singUpWithApp(provider)
      .then((res) => {
        const userInfo = {
          userName: res.user?.displayName,
          userEmail: res.user?.email,
          userImage: res.user?.photoURL,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((result) => {
          console.log(result.data);
          toast.success("Account Created");
          navigate(location?.state ? location.state : "/");
        });
      })
      .catch(() => {
        // Handle errors here if needed
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
            <i className="fab fa-google w-4"></i> Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
