import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const NavigationBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('Hotels');
  const [expanded, setExpanded] = useState(false); // Control Navbar Collapse

  const handleSelectedC = (eventKey) => {
    setSelectedCategory(eventKey);
    setExpanded(false); // Close the navbar on dropdown selection
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      expanded={expanded} // Tie the expanded state
      className="shadow-sm px-5 py-2 fixed-top"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          JollyDay
        </Navbar.Brand>
        {/* Toggle Button */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)} // Toggle the expanded state
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className="nav-link px-4"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              Home
            </Nav.Link>
            <NavDropdown
              title={`Explore ${selectedCategory}`}
              id="explore-hotels-dropdown"
              onSelect={handleSelectedC} // Update selected category
            >
              <NavDropdown.Item
                as={Link}
                to="/explore"
                eventKey="Hotels"
                style={{ listStyleType: 'none' }}
              >
                Hotels
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/explore"
                eventKey="Apartments"
                style={{ listStyleType: 'none' }}
              >
                Apartments
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/explore"
                eventKey="Boathouse"
                style={{ listStyleType: 'none' }}
              >
                Boathouses
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/explore"
                eventKey="Villas"
                style={{ listStyleType: 'none' }}
              >
                Villas
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              as={NavLink}
              to="/booking-summary"
              className="nav-link px-3"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              Booking Summary
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/my-bookings"
             className="nav-link px-3"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              My Bookings
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/aboutus"
              className="nav-link px-3"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              About Us
            </Nav.Link>
          </Nav>
         
          <Nav className='ms-auto' >
            <Nav.Link
              as={NavLink}
              to="http://localhost:3001/joinus"
              className="nav-link px-3"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              List Your Property
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/login"
             className="nav-link px-3"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/signup"
              className="nav-link px-3"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              Signup
            </Nav.Link>
          </Nav>
        
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
