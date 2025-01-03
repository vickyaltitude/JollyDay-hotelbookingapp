import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { NavLink, Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clientReducerActions } from '../../store/userReducer';
import { propertyClientReducerActions } from '../../store/propertyReducer';

const NavigationBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('Hotels');
  const [expanded, setExpanded] = useState(false); 
  const clientToken = useSelector(state => state.client.clientToken);
  const dispatch = useDispatch()


  const handleSelectedC = (eventKey) => {


    setSelectedCategory(eventKey);
    dispatch(propertyClientReducerActions.setSortProperty(eventKey))
    localStorage.setItem('sortProperty',eventKey)
    setExpanded(false); 
  };

 function handleLogout(){

  localStorage.removeItem('clientAuthToken')
  dispatch(clientReducerActions.setClientToken(null))

 }

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
          to="/user/home"
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
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={NavLink}
              to="/user/home"
              className="nav-link px-4"
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>
            <NavDropdown
              title={`Explore ${selectedCategory}`}
              id="explore-hotels-dropdown"
              onSelect={handleSelectedC} 
            >
              <NavDropdown.Item
                as={Link}
                to="/user/explore"
                eventKey="hotel"
                style={{ listStyleType: 'none' }}
              >
                Hotels
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/user/explore"
                eventKey="apartment"
                style={{ listStyleType: 'none' }}
              >
                Apartments
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/user/explore"
                eventKey="boathouse"
                style={{ listStyleType: 'none' }}
              >
                Boathouses
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/user/explore"
                eventKey="villa"
                style={{ listStyleType: 'none' }}
              >
                Villas
              </NavDropdown.Item>
            </NavDropdown>
            {clientToken && <>
              <Nav.Link
              as={NavLink}
              to="/user/booking-summary"
              className="nav-link px-3"
              onClick={() => setExpanded(false)} 
            >
              Booking Summary
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/user/my-bookings"
             className="nav-link px-3"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              My Bookings
            </Nav.Link>
            </>}
            
            <Nav.Link
              as={NavLink}
              to="/user/aboutus"
              className="nav-link px-3"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              About Us
            </Nav.Link>
          </Nav>
         
          <Nav className='ms-auto' >
            <Nav.Link
              as={NavLink}
              to="/user/joinus"
              className="nav-link px-3"
              onClick={() => setExpanded(false)}
            >
              List Your Property
            </Nav.Link>
            {!clientToken && <><Nav.Link
              as={NavLink}
              to="/user/login"
             className="nav-link px-3"
              onClick={() => setExpanded(false)}
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/user/signup"
              className="nav-link px-3"
              onClick={() => setExpanded(false)} // Collapse menu on click
            >
              Signup
            </Nav.Link></>}
            {clientToken && <Button onClick={handleLogout} variant='dark'>Logout</Button>}
          </Nav>
        
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
