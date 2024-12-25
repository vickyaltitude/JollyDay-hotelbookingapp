import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm px-5 py-2 fixed-top" >
      <Navbar.Brand as={NavLink} to="/" style={{ fontSize: '2rem', 
      fontWeight: 'bold',}} className="font-weight-bold" >
        JollyDay Admin
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" exact className="nav-link px-3">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/create-listing" className="nav-link px-3">
            Create Listing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/view-listings" className="nav-link px-3">
            View Listings
          </Nav.Link>
          <NavDropdown title="Manage" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/manage-bookings">
              Manage Bookings
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/booking-history">
              Booking history
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/profile">
              My Profile
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/login" className="nav-link px-3">
            Login
          </Nav.Link>
          <Nav.Link as={NavLink} to="/joinus" className="nav-link px-3">
            Join us!
          </Nav.Link>
          <Button type='button' variant='dark' className="nav-link px-3">
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
