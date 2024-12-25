// ExplorePage.js
import React, { useState } from 'react';
import { Card, Button, Row, Col, Container, Carousel } from 'react-bootstrap';
import PropertyModal from './PropertyModal';
import Background from '../UI/Background';
const ExplorePage = () => {
  // Sample data for properties
  const properties = [
    {
      id: 1,
      name: 'Luxury Beach Resort',
      rating: 4.8,
      location: 'Maldives',
      price: 250,
      images: [
        'https://via.placeholder.com/800x400?text=Luxury+Beach+Resort+1',
        'https://via.placeholder.com/800x400?text=Luxury+Beach+Resort+2',
        'https://via.placeholder.com/800x400?text=Luxury+Beach+Resort+3',
      ],
    },
    {
      id: 2,
      name: 'Mountain View Villa',
      rating: 4.5,
      location: 'Swiss Alps',
      price: 320,
      images: [
        'https://via.placeholder.com/800x400?text=Mountain+View+Villa+1',
        'https://via.placeholder.com/800x400?text=Mountain+View+Villa+2',
        'https://via.placeholder.com/800x400?text=Mountain+View+Villa+3',
      ],
    },
    {
      id: 3,
      name: 'City Center Hotel',
      rating: 4.3,
      location: 'New York',
      price: 180,
      images: [
        'https://via.placeholder.com/800x400?text=City+Center+Hotel+1',
        'https://via.placeholder.com/800x400?text=City+Center+Hotel+2',
        'https://via.placeholder.com/800x400?text=City+Center+Hotel+3',
      ],
    },
    {
      id: 4,
      name: 'Waterfront Boathouse',
      rating: 4.7,
      location: 'Sydney',
      price: 220,
      images: [
        'https://via.placeholder.com/800x400?text=Waterfront+Boathouse+1',
        'https://via.placeholder.com/800x400?text=Waterfront+Boathouse+2',
        'https://via.placeholder.com/800x400?text=Waterfront+Boathouse+3',
      ],
    },
  ];

  const [modalShow, setModalShow] = useState(false); // For controlling modal visibility
  const [selectedProperty, setSelectedProperty] = useState(null); // To store selected property data

  const handleBookNowClick = (property) => {
    setSelectedProperty(property); // Set the selected property
    setModalShow(true); // Show the modal
  };

  const handleCloseModal = () => {
    setModalShow(false); // Close the modal
    setSelectedProperty(null); // Clear selected property
  };

  const handleBooking = () => {
    // Logic for booking (could be an API call or state update)
    alert('Booking Confirmed!');
    setModalShow(false); // Close the modal after booking
  };

  return (
    <Background>
    <Container className="mt-5">
      <h2 className="text-center text-light mb-5" style={{ fontSize: '3rem', fontWeight: '600' }}>
        Explore Our Properties
      </h2>

      <Row>
        {properties.map((property) => (
          <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
            <Card bg="dark" text="light" className="h-100 shadow-lg border-0">
              {/* Carousel for property images */}
              <Carousel>
                {property.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100" src={image} alt={`${property.name} image`} />
                  </Carousel.Item>
                ))}
              </Carousel>

              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: '#FFD700', // Gold color for headings
                    textAlign: 'center',
                  }}
                >
                  {property.name}
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: '1.1rem',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <strong>Location:</strong> {property.location}
                  <br />
                  <strong>Rating:</strong> {property.rating} ★
                  <br />
                  <strong>Price per Night:</strong> ${property.price}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    onClick={() => handleBookNowClick(property)} // Open modal with property details
                  >
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* React Portal Modal */}
      {modalShow && (
        <PropertyModal
          show={modalShow}
          onClose={handleCloseModal}
          property={selectedProperty}
          onBook={handleBooking}
        />
      )}
    </Container>
    </Background>
  );
};

export default ExplorePage;
