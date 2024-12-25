import React from 'react';
import { Card, Button, ListGroup, Row, Col, Container } from 'react-bootstrap';
import Background from '../UI/Background';

const BookingSummary = () => {
  // Sample data for the cart (in a real app, this would come from a state or API)
  const bookingItems = [
    {
      id: 1,
      name: 'Luxury Beach Resort',
      location: 'Maldives',
      pricePerNight: 250,
      nights: 3,
      totalPrice: 250 * 3,
      image: 'https://via.placeholder.com/400x250?text=Luxury+Beach+Resort',
    },
    {
      id: 2,
      name: 'Mountain View Villa',
      location: 'Swiss Alps',
      pricePerNight: 320,
      nights: 2,
      totalPrice: 320 * 2,
      image: 'https://via.placeholder.com/400x250?text=Mountain+View+Villa',
    },
  ];

  const handleRemove = (id) => {
    console.log(`Remove item with ID: ${id}`);
    // Logic for removing the property from the booking (e.g., updating the state)
  };

  return (
    <Background>
    <Container className="mt-5 pb-5">
      <h2 className="text-center text-light mb-5" style={{ fontSize: '3rem', fontWeight: '600' }}>
        Your Booking Summary
      </h2>

      {bookingItems.length === 0 ? (
        <div className="text-center text-light">
          <h3>No properties added to your booking yet.</h3>
        </div>
      ) : (
        <Row>
          <Col sm={12}>
            <Card bg="dark" text="light" className="shadow-lg border-0">
              <Card.Body>
                <ListGroup variant="flush">
                  {bookingItems.map((item) => (
                    <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                      <Row className="w-100">
                        <Col xs={12} md={4}>
                          <img src={item.image} alt={item.name} className="img-fluid rounded" />
                        </Col>
                        <Col xs={12} md={8} className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5>{item.name}</h5>
                            <p className="mb-1"><strong>Location:</strong> {item.location}</p>
                            <p><strong>Price per Night:</strong> ${item.pricePerNight}</p>
                          </div>
                          <div>
                            <h6>Total Price: ${item.totalPrice}</h6>
                            <Button variant="danger" onClick={() => handleRemove(item.id)}>
                              Remove
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="d-flex justify-content-end mt-3">
                  <Button variant="success" href="/checkout">Proceed to Checkout</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
    </Background>
  );
};

export default BookingSummary;
