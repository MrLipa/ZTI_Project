import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import backgroundImage from "../images/1.jpg";
import FlightCards from "./../components/FlightCards";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";

const Home = () => {
  const { t } = useTranslation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

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
          <h1 className="display-4 mb-4">{t("Home_Title")}</h1>
          <br />
          <p className="lead mb-4">{t("Home_Description")}</p>
          <br />
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i>
                <FaMapMarkerAlt />
              </i>
            </span>
            <InputText
              placeholder={t("Home_Placeholder_From") as string}
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
              placeholder={t("Home_Placeholder_To") as string}
              style={{ marginRight: ".5em" }}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <Button
              label={t("Home_Search")}
              icon="pi pi-search"
              className="p-button-rounded"
            />
          </div>
        </div>
      </div>
      <FlightCards to={to} from={from}/>

      <Footer />
    </>
  );
};

export default Home;
