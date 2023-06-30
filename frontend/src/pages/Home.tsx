import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FaMapMarkerAlt } from "react-icons/fa";
import backgroundImage from "../images/background.jpg";
import { FlightCards } from "./../components/FlightCards";
import { Navbar } from "./../components/Navbar";
import { Footer } from "./../components/Footer";

/**
 * @typedef {Object} Home
 * @description This React component represents the Home page.
 * @returns {JSX.Element} Home
 */
const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

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
        <div
          style={{
            margin: "auto",
            width: "70vw",
            marginTop: "20vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1 className="display-4 mb-4" style={{ color: "#ffffff" }}>
            Travel with maximum comfort
          </h1>
          <br />
          <p className="lead mb-4" style={{ color: "#ffffff" }}>
            Find the best travel deals and book your dream trip.
          </p>
          <br />
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i>
                <FaMapMarkerAlt />
              </i>
            </span>
            <InputText
              placeholder="From"
              style={{ marginRight: ".5em" }}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <span className="p-inputgroup-addon">
              <i>
                <FaMapMarkerAlt />
              </i>
            </span>
            <InputText
              placeholder="To"
              style={{ marginRight: ".5em" }}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <Button
              label="Search"
              icon="pi pi-search"
              className="p-button-rounded"
            />
          </div>
        </div>
      </div>
      <FlightCards to={to} from={from} />
      <Footer />
    </>
  );
};

export { Home };
