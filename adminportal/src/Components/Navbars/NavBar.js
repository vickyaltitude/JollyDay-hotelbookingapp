import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
 import { adminReducerActions } from '../../store/adminReducer';


const MyNavbar = () => {
  const dispatch = useDispatch();
  const adminToken = useSelector(state => state.admin.adminAuthToken)
  const adminDetails = useSelector(state => state.admin.adminDetails);
  const profilePic = adminDetails?.profilePic || 'https://via.placeholder.com/150';

  function handleLogout(){

    localStorage.removeItem('adminAuthToken')
     dispatch(adminReducerActions.setAdminAuthToken(null))
    
  }


  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm px-5 py-2 fixed-top" >
      <Navbar.Brand as={NavLink} to="/backend/admin" style={{ fontSize: '2rem', 
      fontWeight: 'bold',}} className="font-weight-bold" >
        JollyDay Admin
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/backend/home" exact className="nav-link px-3">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/backend/create-listing" className="nav-link px-3">
            Create Listing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/backend/view-listings" className="nav-link px-3">
            View Listings
          </Nav.Link>
          {adminToken &&  <NavDropdown title="Manage" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/backend/manage-bookings">
              Manage Bookings
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/backend/booking-history">
              Booking history
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/backend/profile">
              My Profile
            </NavDropdown.Item>
          </NavDropdown>}
         
        </Nav>

        <Nav className="ms-auto">

          {!adminToken && <> <Nav.Link as={NavLink} to="/backend/login" className="nav-link px-3">
            Login
          </Nav.Link>
          <Nav.Link as={NavLink} to="/backend/joinus" className="nav-link px-3">
            Join us!
          </Nav.Link>
          <Nav.Link as={NavLink} to="/backend/signup" className="nav-link px-3">
            Signup
          </Nav.Link></> }

         
        
          {adminToken &&
              <>
                <Nav.Item>
                <Nav.Link as={NavLink} to="/backend/profile">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      border: '2px solid #fff', // Optional: Add border to the profile pic
                    }}
                  />
                </Nav.Link>
                </Nav.Item>
          
          <Button onClick={handleLogout} type='button' variant='dark' className="nav-link px-3">
            Logout
          </Button></>}
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
