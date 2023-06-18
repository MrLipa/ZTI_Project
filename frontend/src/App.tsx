import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Users from "./components/Users";
import PersistLogin from "./components/PersistLogin";
import LayoutLogout from "./components/LayoutLogout";
import SearchFlights from "./pages/SearchFlights";
import Settings from "./pages/Settings";
import Flight from "./pages/Flight";
import LayoutLogin from "./components/LayoutLogin";
import ThemeProvider from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastProvider";
import LanguageProvider from "./context/LanguageContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
  User: 2137,
};

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path="/" element={<LayoutLogout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="help" element={<Help />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                  </Route>
                  <Route element={<PersistLogin />}>
                    <Route path="/" element={<LayoutLogin />}>
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                      >
                        <Route path="profile" element={<Profile />} />
                        <Route
                          path="search-flights"
                          element={<SearchFlights />}
                        />
                        <Route path="flight/:id" element={<Flight />} />
                        <Route path="settings" element={<Settings />} />
                      </Route>
                    </Route>
                  </Route>
                </Routes>
              </QueryClientProvider>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}

export default App;
