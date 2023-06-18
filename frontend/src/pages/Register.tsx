import RegisterForm from "../components/RegisterForm";
import { Card } from "primereact/card";
import "./Register.css";

const Register = () => {
  return (
    <>
      <div className="card-container">
        <Card className="centered-card">
          <RegisterForm />
        </Card>
      </div>
    </>
  );
};

export default Register;
