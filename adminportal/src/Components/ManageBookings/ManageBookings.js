import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Background from '../UI/Background';
import {useSelector} from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ManageBookings = () => {


  const bookings = useSelector(state => state.bookings.bookings)

  
  const [feedback, setFeedback] = useState(null);

 
  const handleBookingAction = (id, action) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: action } : booking
    );

    setFeedback(`Booking ${action}ed successfully!`);
  };

  if (!bookings) {
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


    <Container fluid >
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center my-5"   style={{color:'whitesmoke', fontWeight:'bolder'}}>Manage Bookings</h2>

          {feedback && <Alert variant="success">{feedback}</Alert>}

          <Row>
            {bookings.map((booking) => (
              <Col md={4} key={booking._id} className="mb-4">
                <Card className="shadow-lg" style={{ borderRadius: '10px' }}>
                  <Card.Body style={{ backgroundColor: '#343a40', color: 'white' }}>
                    <Card.Title>{booking.userId.userName}</Card.Title>
                    <Card.Text>
                      <strong>Contact:</strong> {booking.userId.userContact} <br />
                      <strong>Location:</strong> {booking.propertyId.propertyAddress} <br />
                      <strong>Rooms Booked:</strong> {booking.numberOfRooms} <br />
                      <strong>Date Range:</strong> {booking.endDate} <br />
                      <strong>No. of Persons:</strong> {booking.numberOfGuests} <br />
                      <strong>Property Name:</strong> {booking.propertyId.propertyName} <br />
                      <strong>Amount To Be Paid:</strong> {booking.totalCost} 
                    </Card.Text>

                    <div className="d-flex justify-content-between">
                      <Button
                        variant="success"
                        //onClick={() => handleBookingAction(booking.id, 'Confirm')}
                        //disabled={booking.status === 'Confirmed'}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="danger"
                       // onClick={() => handleBookingAction(booking.id, 'Reject')}
                       // disabled={booking.status === 'Rejected'}
                      >
                        Reject
                      </Button>
                    </div>

                    {/* {booking.status && (
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
                    )} */}
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
