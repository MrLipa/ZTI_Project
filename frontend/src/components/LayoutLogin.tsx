import React, { useState, useEffect, useContext } from "react";
import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";
import { SearchBar } from "./SearchBar";
import { NotificationIcon } from "./NotificationIcon";
import { Divider } from "primereact/divider";
import avatarImage from "./../images/1.jpg"; // Importuj obraz
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { SettingsIcon } from "./SettingsIcon";
import { FlagIcon } from "./FlagIcon";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useToast } from "../context/ToastProvider";
import { useUserQuery } from "./../api/ApiHooks";
import { User } from "../typescript/interfaces";
import useAuth from "../hooks/useAuth";

/**
 * @typedef {Object} LayoutLogin
 * @description This React component represents the layout for the logged-in state of the application.
 * It includes a navbar, sidebar, and content area.
 */
const LayoutLogin = () => {
  const { theme, currentTheme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation("translations");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { showToast } = useToast();

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

  const navigate = useNavigate();
  const logout = useLogout();

  /**
   * @typedef {Object} signOut
   * @description This async function signs the user out by invoking the logout hook,
   * then navigates to the homepage and shows a successful logout toast notification.
   */
  const signOut = async () => {
    await logout();
    navigate("/");
    showToast("success", "Success", "Logout successfully");
  };

  /**
   * @typedef {Object} toggleSidebar
   * @description This function toggles the visibility of the sidebar.
   */
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div style={{ color: currentTheme.fontColor }}>
      <div
        className="navbar"
        style={{
          background: `linear-gradient(to bottom, ${currentTheme.navbarColor[0]}, ${currentTheme.navbarColor[1]})`,
        }}
      >
        <div className="navbar-icons-left">
          <h3 style={{ marginRight: "1rem" }}>Air Book</h3>
          <i className="pi pi-bars" onClick={toggleSidebar} />
        </div>
        <div className="navbar-icons-right">
          <SearchBar />
          <NotificationIcon />
          <SettingsIcon />
          <FlagIcon />
          <Link to="/profile">
            <Avatar image={user.image} size="large" shape="circle" />
          </Link>
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
              to="/profile"
              style={{ color: currentTheme.fontColor }}
            >
              <i className="pi pi-user" />
              <span> {t("Profile")}</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/search-flights"
              style={{ color: currentTheme.fontColor }}
            >
              <i className="pi pi-search" />
              <span> {t("Search Flights")}</span>
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
              <span> {t("Settings")}</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="/"
              style={{ color: currentTheme.fontColor }}
            >
              <span onClick={signOut}>
                <i className="pi pi-sign-out" />
                <span> {t("Logout")}</span>
              </span>
            </Link>
          </li>
        </ul>
      </Sidebar>

      <div
        className="content"
        style={{
          backgroundColor: currentTheme.backgroundColor,
        }}
      >
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export { LayoutLogin };
