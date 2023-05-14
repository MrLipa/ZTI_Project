import React, { useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { Navbar, Nav, Container, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { FaSun } from 'react-icons/fa';
import { useState } from 'react';
import Flags from "country-flag-icons/react/3x2";
import { AppContext } from './Layout';

function NavigationBar() {
  const { sidebar, changeSidebar, theme, changeTheme, language, changeLanguage} = useContext(AppContext);

  const flagStyles = { width: '25px', height: '25px' };
  const polandFlag = <Flags.PL style={flagStyles} />;
  const ukFlag = <Flags.GB style={flagStyles} />;
  const germanyFlag = <Flags.DE style={flagStyles} />;

  return (
    <>
      <Navbar className='navbar justify-content-between'>
        <div>
          <FaIcons.FaBars onClick={changeSidebar} className="mx-3 fs-4 text-white"/>
        </div>
        <Form className="search-bar-container d-flex align-items-center">
          <FormControl type="text" placeholder="Search"  style={{marginLeft:'300px', width:'700px'}}/>
          <Button variant="outline-light">Search</Button>
        </Form>
        <div className="d-flex align-items-center">
          <Nav>
            <NavDropdown className="transparent-dropdown" title={language}>
              <NavDropdown.Item style={{width:'70px'}} onClick={() => changeLanguage(polandFlag)}>{polandFlag} 🇵🇱</NavDropdown.Item>
              <NavDropdown.Item  style={{width:'70px'}} onClick={() => changeLanguage(ukFlag)}>{ukFlag} 🇬🇧</NavDropdown.Item>
              <NavDropdown.Item  style={{width:'70px'}} onClick={() => changeLanguage(germanyFlag)}>{germanyFlag} 🇩🇪</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <FaSun className="sun-icon mx-4" />
        </div>
      </Navbar>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul>

          <li className='navbar-brand mb-5 mt-5 list-unstyled text-white'>
            <FaIcons.FaPlane />
            <span>TRAVEL</span>
          </li>

          {SidebarData.map((item, index) => {
          return (
              <li key={index} className="list-unstyled my-4">
                <Link to={item.path} className="text-white text-decoration-none">
                  {item.icon}
                  <span className="mx-2">{item.title}</span>
                </Link>
              </li>
            );
          })}

          <li className='list-unstyled mx-4 my-5 py-5'>
            <FaIcons.FaArrowLeft
              onClick={changeSidebar}
              className="text-white fs-4"
            />
          </li>

        </ul>
      </nav>
    </>
  );
}

export default NavigationBar;
