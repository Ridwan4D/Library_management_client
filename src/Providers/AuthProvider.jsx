import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // ES6
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // register user with email pass
  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // register user with google and github
  const singUpWithApp = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const profileUpdate = (name, image) => {
    setLoading(true);
    return updateProfile(user, {
      displayName: name ? name : user.displayName,
      photoURL: image ? image : user.photoURL,
    });
  };

  // update email
  const updateUserEmail = (email) => {
    setLoading(true);
    return updateEmail(auth.currentUser, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("logged from :", currentUser);
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      // if user exist then issue a token
      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, {
            withCredentials: true
          })
          .then((res) => {
            console.log("token res:", res.data);
          });
      } else {
        axios.post(`${import.meta.env.VITE_API_URL}/logout`,loggedUser,{
          withCredentials: true
        })
        .then(res=>{
          console.log(res.data);
        })
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    signUpUser,
    singUpWithApp,
    signInUser,
    profileUpdate,
    updateUserEmail,
    logout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
