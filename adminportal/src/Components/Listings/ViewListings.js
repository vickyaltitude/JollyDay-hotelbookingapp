import React,{useEffect,useState} from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import Background from '../UI/Background';
import {NavLink, useNavigate} from 'react-router-dom';
import { useSelector} from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ViewListings = () => {

  const navigate = useNavigate();
  const adminToken = useSelector(state => state.admin.adminAuthToken);
  const properties = useSelector(state => state.property.properties);
 const [isTokenChecked, setIsTokenChecked] = useState(false);


  useEffect(() => {
     
     if (adminToken !== null) {
       setIsTokenChecked(true);
     } else if (isTokenChecked) {
       navigate('/admin/login');
     }
   }, [adminToken, navigate, isTokenChecked]);
 
 
   if (!isTokenChecked) {
    return (
      <Background>
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={6} style={{ paddingTop: '50px' }}>
              <Card style={{ backgroundColor: '#212529', color: 'white', borderRadius: '10px', padding: '30px' }}>
                <Card.Body>
                  <Skeleton height={30} width="70%" style={{ marginBottom: '20px' }} />
                  <Skeleton height={50} width="100%" count={3} style={{ marginBottom: '20px' }} />
                  <Skeleton height={40} width="40%" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Background>
    );
  }

 
  return (
    <Background>
      <Container className="text-white py-5" style={{ flex: 1 }}>
        <h1 className="text-center mb-5" style={{ color: 'whitesmoke', fontWeight: 'bolder' }}>My Property Listings</h1>
        <Row>
          {properties.map((listing) => (
            <Col md={4} key={listing._id} className="mb-4">
              <Card className="text-white" style={{ border: 'none' }}>
          
                <Carousel interval={3000}>
                  {listing.propertyImages.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 h-100"
                        src={image}
                        alt={`Image ${index + 1} of ${listing.propertyName}`}
                        style={{ objectFit: 'cover',minHeight: '300px', maxHeight: '300px' }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>

                <Card.Body 
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',  
                        padding: '20px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' 
                      }}
                    >
                      <Card.Title style={{ color: '#ffb74d', fontWeight: 'bold', fontSize: '1.5rem' }}>{listing.propertyName}</Card.Title>
                      <Card.Text style={{ color: '#fff', fontSize: '1.1rem' }}>
                        <strong>Category:</strong> {listing.propertyCategory}
                        <br />
                        <strong>Price per Night:</strong> ${listing.ppn}
                        <br />
                        <strong>Rooms Available:</strong> {listing.roomsAvailable}
                        <br />
                        <strong>Property Rules:</strong> {listing.propertyRules.coupleFriendly ? 'Couple Friendly' : 'Couples not allowed'}
                      </Card.Text>
                      
                      <Button 
                        as={NavLink} 
                        to={`/admin/propertydetails/${listing._id}`} 
                        variant="warning" 
                        block
                        style={{
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '5px',
                        }}
                      >
                        View Details
                      </Button>
                    </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Background>
  );
};

export default ViewListings;
