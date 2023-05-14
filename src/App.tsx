import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Connection from "./pages/Connection";
import Layout from "./components/Login/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="help" element={<Help />} />
        <Route path="/" element={<Layout />}>
          <Route path="connection" element={<Connection />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
