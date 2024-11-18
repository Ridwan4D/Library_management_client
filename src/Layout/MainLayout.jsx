import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

const MainLayout = () => {
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
