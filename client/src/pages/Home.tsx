import {
    Form,
    FormControl,
    Button,
    Container,
  } from "react-bootstrap";
  import backgroundImage from "../images/1.jpg";
  import { InputGroup } from "react-bootstrap";
  import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
  import FlightCards from "../components/Logout/FlightCards";
  import Navbar from "../components/Logout/Navbar";
  import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
        <div style={{backgroundImage: `url(${backgroundImage})`,height: "100vh",backgroundSize: "cover",}}>
            <Navbar/>
            <Container style={{ marginTop: "20vh" }} className="text-center">
                <h1 className="display-4 mb-4">Podróżuj z maksymalnym komfortem</h1>
                <p className="lead mb-4">
                    Znajdź najlepsze oferty na podróże i zarezerwuj swój wymarzony
                    wyjazd.
                </p>
                <InputGroup className="mb-3">
                    <InputGroup.Text>
                    <FaMapMarkerAlt />
                    </InputGroup.Text>
                    <FormControl
                    placeholder="Od"
                    className="me-1"
                    style={{ height: "50px" }}
                    />
                    <InputGroup.Text>
                    <FaMapMarkerAlt />
                    </InputGroup.Text>
                    <FormControl
                    placeholder="Do"
                    className="me-1"
                    style={{ height: "50px" }}
                    />
                    <Form.Control
                    as="select"
                    className="me-2"
                    style={{ height: "50px" }}
                    >
                    <option>Klasa Ekonomiczna</option>
                    <option>Klasa Premium</option>
                    <option>Klasa Business</option>
                    </Form.Control>
                    <Button variant="primary">
                    <FaSearch /> Szukaj
                    </Button>
                </InputGroup>
            </Container>
        </div>
        <FlightCards/>
        <Footer />
    </>
  )
}

export default Home