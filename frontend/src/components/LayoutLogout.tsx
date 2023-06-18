import backgroundImage from "../images/1.jpg";
import FlightCards from "./FlightCards";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const LayoutLogout = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "130vh",
          backgroundSize: "cover",
        }}
      >
        <Navbar />
        <Outlet />
      </div>
      <FlightCards />
      <Footer />
    </>
  );
};

export default LayoutLogout;
