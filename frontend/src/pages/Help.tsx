import {
  Container,
} from "react-bootstrap";
import backgroundImage from "../images/1.jpg";
import FlightCards from "../components/Logout/FlightCards";
import Navbar from "../components/Logout/Navbar";
import Footer from "../components/Footer";

const Help = () => {
return (
  <>
      <div style={{backgroundImage: `url(${backgroundImage})`,height: "100vh",backgroundSize: "cover",}}>
          <Navbar/>
          <Container style={{ marginTop: "20vh" }} className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Container>
      </div>
      <FlightCards/>
      <Footer />
  </>
)
}

export default Help