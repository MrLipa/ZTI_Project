import React, { useState, useEffect, useContext } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from "primereact/tabview";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";
import { useUpdateUserMutation, useUserQuery } from "./../api/ApiHooks";
import { User } from "../typescript/interfaces";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import Flags from "country-flag-icons/react/3x2";
import { Menu } from "primereact/menu";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";

const MessageSettingsComponent = () => {
  const { t } = useTranslation();
  const { theme, currentTheme, toggleTheme } = useContext(ThemeContext);
  const { language, flag, toggleLanguage } = useContext(LanguageContext);

  const flagStyles: React.CSSProperties = {
    width: "25px",
    height: "25px",
    marginRight: "9px",
  };

  const languageOptions = [
    {
      label: t("polish"),
      icon: <Flags.PL style={flagStyles} />,
      command: () => {
        toggleLanguage("pl");
      },
    },
    {
      label: t("english"),
      icon: <Flags.GB style={flagStyles} />,
      command: () => {
        toggleLanguage("en");
      },
    },
    {
      label: t("german"),
      icon: <Flags.DE style={flagStyles} />,
      command: () => {
        toggleLanguage("de");
      },
    },
  ];

  return (
    <div>
      <h2 style={{ fontWeight: "bold" }}>{t("messageSettings")}</h2>
      <p>{t("selectNotifications")}</p>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ fontWeight: "bold" }}>{t("theme")}</h3>
        <Card>
          <h4>{t("darkTheme")}</h4>
          <InputSwitch
            checked={theme === 0 ? false : true}
            onChange={() => {
              toggleTheme(theme === 0 ? 1 : 0);
            }}
          />
        </Card>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ fontWeight: "bold" }}>{t("language")}</h3>
        <Card>
          <h4>{t("selectLanguage")}</h4>
          <Menu model={languageOptions} />
        </Card>
      </div>
    </div>
  );
};

const ProfileComponent = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  if (!auth?.userId) {
    throw new Error("User id is required");
  }
  const { data: userData, isLoading, isError } = useUserQuery(auth?.userId);
  const [user, setUser] = useState<User>({
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    description: "",
    phone: "",
    address: "",
    image: "",
    userMessage: [],
    userFlightId: [],
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const updateUserMutation = useUpdateUserMutation();

  const handleAvatarChange = () => {
    updateUserMutation.mutate(user);
  };

  const handleSaveChanges = () => {
    updateUserMutation.mutate(user);
  };

  return (
    <div>
      <div className="p-d-flex p-ai-center">
        <Image src={user.image} alt="Image" width="250" height="250" preview />
        <Button
          label={t("changeAvatar") ?? ""}
          onClick={handleAvatarChange}
          style={{ marginLeft: "50px" }}
        />
      </div>

      <div
        className="p-grid p-mt-4"
        style={{ marginTop: "40px", width: "100%" }}
      >
        <div className="p-col-12 p-md-6" style={{ width: "100%" }}>
          <InputText
            id="firstName"
            placeholder={t("firstNamePlaceholder") ?? ""}
            value={user.firstName}
            onChange={handleInputChange}
            style={{ width: "49%", marginRight: "2%" }}
          />
          <InputText
            id="lastName"
            placeholder={t("lastNamePlaceholder") ?? ""}
            value={user.lastName}
            onChange={handleInputChange}
            style={{ width: "49%" }}
          />
        </div>
        <div className="p-col-12 p-md-6" style={{ marginTop: "2%" }}>
          <InputText
            id="email"
            placeholder={t("emailPlaceholder") ?? ""}
            value={user.email}
            onChange={handleInputChange}
            style={{ width: "49%", marginRight: "2%" }}
          />
          <InputText
            id="address"
            placeholder={t("addressPlaceholder") ?? ""}
            value={user.address}
            onChange={handleInputChange}
            style={{ width: "49%" }}
          />
        </div>
        <div
          className="p-col-12 p-md-6"
          style={{ marginTop: "2%", marginBottom: "40px" }}
        >
          <InputText
            id="phone"
            placeholder={t("phonePlaceholder") ?? ""}
            value={user.phone}
            onChange={handleInputChange}
            style={{ width: "49%", marginRight: "2%" }}
          />
          <InputText
            id="password"
            type="password"
            placeholder={t("passwordPlaceholder") ?? ""}
            value={user.password}
            onChange={handleInputChange}
            style={{ width: "49%" }}
          />
        </div>
      </div>
      <InputTextarea
        value={user?.description || ""}
        onChange={(e) =>
          setUser((prevUser) => {
            return prevUser
              ? { ...prevUser, description: e.target.value }
              : prevUser;
          })
        }
        style={{
          marginTop: "2%",
          marginBottom: "40px",
          width: "100%",
          height: "100%",
        }}
        rows={10}
      />

      <div className="p-d-flex p-jc-end p-mt-4">
        <Button label={t("saveChanges") ?? ""} onClick={handleSaveChanges} />
      </div>
    </div>
  );
};

const Settings = () => {
  const { t } = useTranslation();
  return (
    <TabView>
      <TabPanel header={t("profileTab")}>
        <ProfileComponent />
      </TabPanel>
      <TabPanel header={t("settingsTab")}>
        <MessageSettingsComponent />
      </TabPanel>
    </TabView>
  );
};

export {Settings};
