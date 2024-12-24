import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Background from '../UI/Background';

const ManageBookings = () => {

  const [bookings, setBookings] = useState([
    {
      id: 1,
      userName: 'John Doe',
      contactNumber: '123-456-7890',
      location: 'New York, USA',
      roomsBooked: 2,
      dateRange: '2024-12-01 to 2024-12-07',
      numPersons: 4,
      propertyName: 'Oceanfront Villa',
      totalPrice: '$350'
    },
    {
      id: 2,
      userName: 'Jane Smith',
      contactNumber: '987-654-3210',
      location: 'Los Angeles, USA',
      roomsBooked: 1,
      dateRange: '2024-12-10 to 2024-12-12',
      numPersons: 2,
      propertyName: 'Oceanfront Villa',
       totalPrice: '$350'
    },
    {
      id: 3,
      userName: 'Emily Johnson',
      contactNumber: '456-123-7890',
      location: 'Miami, USA',
      roomsBooked: 3,
      dateRange: '2024-12-15 to 2024-12-20',
      numPersons: 6,
      propertyName: 'Oceanfront Villa',
      totalPrice: '$350'
    },
  ]);

  
  const [feedback, setFeedback] = useState(null);

 
  const handleBookingAction = (id, action) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: action } : booking
    );
    setBookings(updatedBookings);
    setFeedback(`Booking ${action}ed successfully!`);
  };

  return (
    <Background>


    <Container fluid >
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center my-5"   style={{color:'whitesmoke', fontWeight:'bolder'}}>Manage Bookings</h2>

          {feedback && <Alert variant="success">{feedback}</Alert>}

          <Row>
            {bookings.map((booking) => (
              <Col md={4} key={booking.id} className="mb-4">
                <Card className="shadow-lg" style={{ borderRadius: '10px' }}>
                  <Card.Body style={{ backgroundColor: '#343a40', color: 'white' }}>
                    <Card.Title>{booking.userName}</Card.Title>
                    <Card.Text>
                      <strong>Contact:</strong> {booking.contactNumber} <br />
                      <strong>Location:</strong> {booking.location} <br />
                      <strong>Rooms Booked:</strong> {booking.roomsBooked} <br />
                      <strong>Date Range:</strong> {booking.dateRange} <br />
                      <strong>No. of Persons:</strong> {booking.numPersons} <br />
                      <strong>Property Name:</strong> {booking.propertyName} <br />
                      <strong>Amount To Be Paid:</strong> {booking.totalPrice} 
                    </Card.Text>

                    <div className="d-flex justify-content-between">
                      <Button
                        variant="success"
                        onClick={() => handleBookingAction(booking.id, 'Confirm')}
                        disabled={booking.status === 'Confirmed'}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleBookingAction(booking.id, 'Reject')}
                        disabled={booking.status === 'Rejected'}
                      >
                        Reject
                      </Button>
                    </div>

                    {booking.status && (
                      <div className="mt-3">
                        <strong>Status: </strong>
                        <span
                          style={{
                            color: booking.status === 'Confirmed' ? 'green' : 'red',
                          }}
                        >
                          {booking.status}
                        </span>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
    </Background>
  );
};

export default ManageBookings;
