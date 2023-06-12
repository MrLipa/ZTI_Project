import React, { useState, useContext } from "react";
import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";
import SearchBar from "./SearchBar";
import CustomIcon from "./CustomIcon";
import BellIcon from "./BellIcon";
import { Divider } from "primereact/divider";
import avatarImage from "./1.jpg"; // Importuj obraz
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Flags from "country-flag-icons/react/3x2";
import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { Outlet } from 'react-router-dom';

const Navbar = () => {
  const { language, flag, toggleLanguage } = useContext(LanguageContext);
  const { theme, currentTheme, toggleTheme } = useContext(ThemeContext);

  const flagStyles: React.CSSProperties = {
    width: "25px",
    height: "25px",
    marginRight: "9px",
  };

  const languageOptions = [
    {
      label: "Polski",
      icon: <Flags.PL style={flagStyles} />,
      command: () => {
        toggleLanguage("pl");
      },
    },
    {
      label: "Angielski",
      icon: <Flags.GB style={flagStyles} />,
      command: () => {
        toggleLanguage("en");
      },
    },
    {
      label: "Niemiecki",
      icon: <Flags.DE style={flagStyles} />,
      command: () => {
        toggleLanguage("de");
      },
    },
  ];

  const settings = [
    {
      label: "Theme",
      icon: theme === 1 ? "pi pi-sun" : "pi pi-moon",
      command: () => {
        toggleTheme(theme === 0 ? 1 : 0);
      },
    },
    { label: "Logout", icon: "pi pi-fw pi-sign-out" },
  ];

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const op1 = useRef<OverlayPanel | null>(null);
  const op2 = useRef<OverlayPanel | null>(null);

  return (
    <div style={{ color: currentTheme.fontColor }}>
      <div
        className="navbar"
        style={{
          background: `linear-gradient(to bottom, ${currentTheme.navbarColor[0]}, ${currentTheme.navbarColor[1]})`,
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        }}
      >
        <div
          className="navbar-icons-left"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginLeft: "3vw",
          }}
        >
          <h3 style={{ marginRight: "1rem" }}>Air Book</h3>
          <i
            className="pi pi-bars"
            onClick={toggleSidebar}
            style={{ fontSize: "2rem", marginRight: "5rem" }}
          />
        </div>
        <div
          className="navbar-icons-right"
          style={{
            marginRight: "3vw",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <SearchBar />
          <BellIcon icon="bell" value="7" />
          <div>
            <i
              className={`pi pi-cog`}
              style={{ fontSize: "2rem" }}
              onClick={(e) => op1.current.toggle(e)}
            ></i>
            <OverlayPanel
              ref={op1}
              id={`cog-menu`}
              showCloseIcon={false}
              dismissable={true}
            >
              <Menu model={settings} />
            </OverlayPanel>
          </div>
          <div>
            <i onClick={(e) => op2.current.toggle(e)}>{flag}</i>
            <OverlayPanel
              ref={op2}
              id={`globe-menu`}
              showCloseIcon={false}
              dismissable={true}
            >
              <Menu model={languageOptions} />
            </OverlayPanel>
          </div>
          <Avatar image={avatarImage} size="large" shape="circle" />
        </div>
      </div>

      <Sidebar
        className="custom-sidebar"
        visible={sidebarVisible}
        onHide={toggleSidebar}
        showCloseIcon={false}
        style={{
          background: `linear-gradient(to bottom, ${currentTheme.navbarColor[0]}, ${currentTheme.navbarColor[1]})`,
        }}
      >
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/home"
              style={{ color: currentTheme.fontColor }}
            >
              <i className="pi pi-home" />
              <span> Home</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/help"
              style={{ color: currentTheme.fontColor }}
            >
              <i className="pi pi-question-circle" />
              <span> Help</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/profile"
              style={{ color: currentTheme.fontColor }}
            >
              <i className="pi pi-user" />
              <span> Profile</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/search-flights"
              style={{ color: currentTheme.fontColor }}
            >
              <i className="pi pi-search" />
              <span> Search Flights</span>
            </Link>
          </li>
          <Divider />
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/settings"
              style={{ color: currentTheme.fontColor }}
            >
              <i className="pi pi-cog" />
              <span> Settings</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/logout"
              style={{ color: currentTheme.fontColor }}
            >
              <i className="pi pi-sign-out" />
              <span> Logout</span>
            </Link>
          </li>
        </ul>
      </Sidebar>

      <div
        className="content"
        style={{
          minHeight: "100vh",
          paddingLeft: "260px",
          paddingRight: "100px",
          paddingTop: "50px",
          paddingBottom: "50px",
          backgroundColor: currentTheme.backgroundColor,
        }}
      >
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Navbar;
