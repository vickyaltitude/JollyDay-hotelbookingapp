import React from 'react';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import Background from '../UI/Background';

const MyBookingsPage = () => {
  // Sample data for bookings
  const bookings = [
    {
      id: 1,
      name: 'Luxury Beach Resort',
      location: 'Maldives',
      pricePaid: 750,
      status: 'Confirmed',
      dates: '2024-12-20 to 2024-12-23',
      image: 'https://via.placeholder.com/400x250?text=Luxury+Beach+Resort',
    },
    {
      id: 2,
      name: 'Mountain View Villa',
      location: 'Swiss Alps',
      pricePaid: 640,
      status: 'Rejected',
      dates: '2024-11-15 to 2024-11-18',
      image: 'https://via.placeholder.com/400x250?text=Mountain+View+Villa',
    },
    {
      id: 3,
      name: 'City Center Hotel',
      location: 'New York',
      pricePaid: 0,
      status: 'Payment Failed',
      dates: '2024-10-10 to 2024-10-12',
      image: 'https://via.placeholder.com/400x250?text=City+Center+Hotel',
    },
  ];

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <Badge bg="success">Confirmed</Badge>;
      case 'Rejected':
        return <Badge bg="danger">Rejected</Badge>;
      case 'Payment Failed':
        return <Badge bg="warning">Payment Failed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Background>
    <Container className="mt-5">
      <h2 className="text-center text-light mb-5" style={{ fontSize: '3rem', fontWeight: '600' }}>
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center text-light">
          <h3>You have no booking history.</h3>
        </div>
      ) : (
        <Row>
          {bookings.map((booking) => (
            <Col key={booking.id} sm={12} md={6} lg={4} className="mb-4">
              <Card bg="dark" text="light" className="shadow-lg border-0 h-100">
                <Card.Img variant="top" src={booking.image} alt={booking.name} />
                <Card.Body>
                  <Card.Title style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {booking.name}
                  </Card.Title>
                  <Card.Text>
                    <strong>Location:</strong> {booking.location}
                    <br />
                    <strong>Dates:</strong> {booking.dates}
                    <br />
                    <strong>Price Paid:</strong> ${booking.pricePaid}
                    <br />
                    <strong>Status:</strong> {getStatusBadge(booking.status)}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button variant="primary" href={`/booking-details/${booking.id}`}>
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
    </Background>
  );
};

export default MyBookingsPage;
