import { RegisterForm } from "../components/RegisterForm";
import { Card } from "primereact/card";
import "./Register.css";
import backgroundImage from "../images/background.jpg";
import { Navbar } from "./../components/Navbar";
import { Footer } from "./../components/Footer";

/**
 * @typedef {Object} Register
 * @description This React component represents the Register page.
 * @returns {JSX.Element} Register
 */
const Register = () => {
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
            <RegisterForm />
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { Register };
