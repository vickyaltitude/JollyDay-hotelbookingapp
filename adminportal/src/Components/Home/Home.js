import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const HomePage = () => {
    return (
        <>
          <div className="banner" 
     style={{
       position: 'relative',
       background: 'url(https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?cs=srgb&dl=pexels-pixabay-221457.jpg&fm=jpg) no-repeat center',
       backgroundSize: 'cover',
       height: '400px'
     }}
>

  <div 
    style={{
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: '1'
    }}
  />

  <Container 
    className="text-center text-white" 
    style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative', 
      zIndex: '2', 
      color: 'white',
    }}
  >
    <h1 style={{
      fontSize: '3rem', 
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
    }}>
      Welcome to Your Property Management Portal
    </h1>
    <p style={{
      fontSize: '1.25rem', 
      fontWeight: '500', 
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' 
    }}>
      Manage your properties with ease
    </p>
  </Container>
</div>

         
            <Container className="my-5">
                <h2 className="text-center text-dark">List Your Properties with Us</h2>
                <p className="text-center ">
                    Our platform allows you to effortlessly manage and list your hotels, apartments, boathouses, and villas. 
                    Join a community of property owners and maximize your rental income with our user-friendly admin portal.
                </p>
                <p className="text-center">
                    Whether you have a cozy apartment in the city or a luxurious villa by the beach, we provide the tools you need to showcase your property effectively.
                </p>
                <div className="text-center">
                    <NavLink to="/" className="btn btn-primary btn-lg">Join Us & List Your Properties Now</NavLink>
                </div>
                <h3 className="text-center text-white mt-5">Featured Properties</h3>
                <Row>
               
                    <Col md={4}>
                        <Card className="mb-4" style={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }}>
                            <Card.Img variant="top" src="https://via.placeholder.com/350x200" alt="Property 1" />
                            <Card.Body>
                                <Card.Title className="text-white">Luxury Villa</Card.Title>
                                <Card.Text className="text-white">A beautiful luxury villa with stunning views, perfect for family vacations.</Card.Text>
                                <NavLink to="/" className="btn btn-primary">View Details</NavLink>
                            </Card.Body>
                        </Card>
                    </Col>
          
                    <Col md={4}>
                        <Card className="mb-4" style={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }}>
                            <Card.Img variant="top" src="https://via.placeholder.com/350x200" alt="Property 2" />
                            <Card.Body>
                                <Card.Title className="text-white">Cozy Apartment</Card.Title>
                                <Card.Text className="text-white">A cozy apartment in the heart of the city, ideal for business travelers.</Card.Text>
                                <NavLink to="/" className="btn btn-primary">View Details</NavLink>
                            </Card.Body>
                        </Card>
                    </Col>
              
                    <Col md={4}>
                        <Card className="mb-4" style={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }}>
                            <Card.Img variant="top" src="https://via.placeholder.com/350x200" alt="Property 3" />
                            <Card.Body>
                                <Card.Title className="text-white">Charming Boathouse</Card.Title>
                                <Card.Text className="text-white">A charming boathouse perfect for a weekend getaway, surrounded by nature.</Card.Text>
                                <NavLink to="/" className="btn btn-primary">View Details</NavLink>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default HomePage;