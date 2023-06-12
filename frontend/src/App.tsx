import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import SearchFlights from "./pages/SearchFlights";
import Settings from "./pages/Settings";
import Flight from "./pages/Flight";
import Layout from "./pages/Layout";
import ThemeProvider from "./context/ThemeContext";
import LanguageProvider from "./context/LanguageContext";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="home" element={<Help />} />
                <Route path="logout" element={<Help />} />
                <Route path="help" element={<Help />} />
                <Route path="profile" element={<Profile />} />
                <Route path="search-flights" element={<SearchFlights />} />
                <Route path="flight/:id" element={<Flight />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}

export default App;