import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Background from '../UI/Background';
import {useSelector} from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { bookingsReducerActions } from '../../store/bookingReducer';
import {useDispatch} from 'react-redux';
import ApiHandler from '../../ApiHandler';

const ManageBookings = () => {


  const bookings = useSelector(state => state.bookings.bookings);
  const filterByStatus = bookings.filter(booking =>  booking.bookingStatus === 'Pending Confirmation')
  const dispatch = useDispatch();
  
  const [feedback, setFeedback] = useState(null);

 
  const handleBookingAction = (id, action) => {

    const updatedBookings = bookings.map((booking) =>

      booking._id === id ? { ...booking, bookingStatus: action === 'Confirm' ? 'Confirmed by admin' : 'Rejected by admin' } : booking

    );

    dispatch(bookingsReducerActions.setBookings(updatedBookings))

     ApiHandler('http://localhost:8000/admin/confirmbooking',{
       method:'POST',
       headers:{
        'Content-Type' : 'application/json'
       },
       body: JSON.stringify({id,bookingStatus: action === 'Confirm' ? 'Confirmed by admin' : 'Rejected by admin' })
     })

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
            {filterByStatus.map((booking) => (
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
                      {booking.bookingStatus === 'Confirmed by admin' &&  <Button variant='warning' disabled>
                         Pending Payment
                      </Button>}

                      {booking.bookingStatus === 'Pending Confirmation'  && <>   <Button
                        variant="success"
                        onClick={() => handleBookingAction(booking._id, 'Confirm')}
          
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleBookingAction(booking._id, 'Reject')}
                    
                      >
                        Reject
                      </Button></>}
                  
                    
                    </div>

                  
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
