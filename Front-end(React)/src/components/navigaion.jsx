import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import imdb from "../logo/imdb.png";

import { Navbar, Nav } from "react-bootstrap";
const token = localStorage.getItem("token");
class Navigation extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          <img
            src={imdb}
            alt="Italian Trulli"
            style={{ width: 80, height: 50 }}
          />
          <Navbar.Brand href="#home">Movies-Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!token && (
                <React.Fragment>
                  <Nav.Link href="../LoginForm" style={{ color: "#000000" }}>
                    Login
                  </Nav.Link>
                  <Nav.Link href="../RegisterForm" style={{ color: "#000000" }}>
                    Register
                  </Nav.Link>
                </React.Fragment>
              )}

              <Nav.Link href="../Movies" style={{ color: "#000000" }}>
                Movies
              </Nav.Link>
              <Nav.Link href="../Customers" style={{ color: "#000000" }}>
                Customers
              </Nav.Link>
              <Nav.Link href="../Rentals" style={{ color: "#000000" }}>
                Rentals
              </Nav.Link>
              {token && (
                <Nav.Link href="../Logout" style={{ color: "#000000" }}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Navigation;
