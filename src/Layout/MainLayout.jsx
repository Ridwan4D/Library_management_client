import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  useEffect(() => {
    // Scroll to the top of the page on every route change
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <div className="max-w-[1600px] mx-auto">
      <Nav />
      <div>
        <Outlet />
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </div>
  );
};

export default MainLayout;
