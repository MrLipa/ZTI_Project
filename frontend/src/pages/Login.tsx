import { LoginForm } from "../components/LoginForm";
import { Card } from "primereact/card";
import backgroundImage from "../images/background.jpg";
import { Navbar } from "./../components/Navbar";
import { Footer } from "./../components/Footer";

/**
 * @typedef {Object} Login
 * @description This React component represents the Login page.
 * @returns {JSX.Element} Login
 */
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
      <Footer />
    </>
  );
};

export { Login };
