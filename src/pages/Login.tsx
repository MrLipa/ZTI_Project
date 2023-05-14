import backgroundImage from "../images/1.jpg";
import Cards from "../components/Logout/Cards";
import Navbar from "../components/Logout/Navbar";
import Footer from "../components/Footer";
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
      setErrMsg('');
  }, [email, pwd])

  const handleSubmit = async (e) => {
      e.preventDefault();
  }
  
  return (
    <>
        <div style={{backgroundImage: `url(${backgroundImage})`,height: "100vh",backgroundSize: "cover",}}>
          <Navbar/>
          <Container style={{ marginTop: "20vh", width: "500px" }} className="text-center login">
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <h1>Sign In</h1>
              <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
                  <input
                      type="text"
                      id="email"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                  />

                  <label htmlFor="password">Password:</label>
                  <input
                      type="password"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                  />
                  <button>Sign In</button>
              </form>
              <p>
                  Need an Account?<br />
                  <span className="line">
                      <Link to="/register">Sign Up</Link>
                  </span>
              </p>
            </Container>
        </div>
        <Cards/>
        <Footer />
    </>
  )
}

export default Login