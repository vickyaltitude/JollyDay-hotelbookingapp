import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import Background from '../UI/Background';

const ViewListings = () => {
  const listings = [
    {
      id: 1,
      name: 'Oceanfront Villa',
      category: 'Villa',
      pricePerNight: 300,
      images: [
        'https://via.placeholder.com/400x300?text=Oceanfront+Villa+1',
        'https://via.placeholder.com/400x300?text=Oceanfront+Villa+2',
        'https://via.placeholder.com/400x300?text=Oceanfront+Villa+3'
      ]
    },
    {
      id: 2,
      name: 'City Center Apartment',
      category: 'Apartment',
      pricePerNight: 150,
      images: [
        'https://via.placeholder.com/400x300?text=City+Center+Apartment+1',
        'https://via.placeholder.com/400x300?text=City+Center+Apartment+2'
      ]
    },
    {
      id: 3,
      name: 'Luxury Boathouse',
      category: 'Boathouse',
      pricePerNight: 200,
      images: [
        'https://via.placeholder.com/400x300?text=Luxury+Boathouse+1',
        'https://via.placeholder.com/400x300?text=Luxury+Boathouse+2',
        'https://via.placeholder.com/400x300?text=Luxury+Boathouse+3'
      ]
    },
    {
      id: 4,
      name: '5-Star Hotel Suite',
      category: 'Hotel',
      pricePerNight: 500,
      images: [
        'https://via.placeholder.com/400x300?text=Hotel+Suite+1',
        'https://via.placeholder.com/400x300?text=Hotel+Suite+2',
        'https://via.placeholder.com/400x300?text=Hotel+Suite+3'
      ]
    }
  ];

  return (
    <Background>
      <Container className="text-white py-5" style={{ flex: 1 }}>
        <h1 className="text-center mb-5" style={{ color: 'whitesmoke', fontWeight: 'bolder' }}>My Property Listings</h1>
        <Row>
          {listings.map((listing) => (
            <Col md={4} key={listing.id} className="mb-4">
              <Card className="text-white" style={{ border: 'none' }}>
          
                <Carousel interval={3000}>
                  {listing.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={image}
                        alt={`Image ${index + 1} of ${listing.name}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>

                
                <Card.Body style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                  <Card.Title>{listing.name}</Card.Title>
                  <Card.Text>
                    Category: {listing.category}
                    <br />
                    Price per Night: ${listing.pricePerNight}
                  </Card.Text>
                  <Button variant="light" block>
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
