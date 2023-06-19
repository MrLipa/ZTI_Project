import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";


const Home = () => {
  const { t } = useTranslation();
  const flightClasses = [
    {label: t("Home_Class_Economy"), value: 'Economy'},
    {label: t("Home_Class_Premium"), value: 'Premium'},
    {label: t("Home_Class_Business"), value: 'Business'}
  ];

  return (
    <div style={{ margin: "auto", width: "70vw", marginTop: "20vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h1 className="display-4 mb-4">{t("Home_Title")}</h1>
      <br/>
      <p className="lead mb-4">{t("Home_Description")}</p>
      <br/>
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i><FaMapMarkerAlt /></i>
        </span>
        <InputText
          placeholder={t("Home_Placeholder_From") as string}
          style={{ marginRight: ".5em" }}
        />
        <span className="p-inputgroup-addon">
          <i><FaMapMarkerAlt /></i>
        </span>
        <InputText
          placeholder={t("Home_Placeholder_To") as string}
          style={{ marginRight: ".5em" }}
        />
        <Button label={t("Home_Search")} icon="pi pi-search" className="p-button-rounded" />
      </div>
    </div>
  );
};

export default Home;
