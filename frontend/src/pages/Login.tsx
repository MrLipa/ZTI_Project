import LoginForm from "../components/LoginForm";
import { Card } from "primereact/card";
import { Flight } from "../typescript/interfaces";
import backgroundImage from "../images/1.jpg";
import FlightCards from "./../components/FlightCards";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import { Outlet } from "react-router-dom";

const Login = () => {
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
        <div className="card-container">
          <Card className="centered-card">
            <LoginForm />
          </Card>
        </div>
      </div>
      <FlightCards />
      <Footer />
    </>
  );
};

export default Login;
