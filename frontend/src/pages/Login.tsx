import backgroundImage from "../images/1.jpg";
import FlightCards from "../components/FlightCards";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import { Card } from "primereact/card";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="card-container">
        <Card className="centered-card">
          <LoginForm />
        </Card>
      </div>
    </>
  );
};

export default Login;
