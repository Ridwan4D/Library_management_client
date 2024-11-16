import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Nav />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
