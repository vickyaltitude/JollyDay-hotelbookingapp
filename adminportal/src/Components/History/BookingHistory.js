import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import Background from '../UI/Background';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {useSelector} from 'react-redux';
 
const BookingHistory = () => {

  const bookings = useSelector(state => state.bookings.bookings);
  const filterByBookings = bookings.filter(
    (list) =>
      list.bookingStatus === "Cancelled by client" ||
      list.bookingStatus === "Confirmed booking" ||
      list.bookingStatus === "Rejected by admin" ||
      list.bookingStatus === "Confirmed by admin" 
  );
 
  console.log(filterByBookings)

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
      <Container className="text-white py-5">
        <h1 className="text-center mb-5" style={{ color: 'whitesmoke', fontWeight: 'bolder' }}>Booking History</h1>
        
    
        <Row>
          <Col md={12}>
            <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px' }}>
              <Card.Body>
                <Table striped bordered hover responsive className="text-white">
                  <thead>
                    <tr>
                      <th>Property Name</th>
                      <th>Customer Name</th>
                      <th>Booking Date</th>
                      <th>Status</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterByBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.propertyId.propertyName}</td>
                        <td>{booking.userId.userName}</td>
                        <td> From{" "}
                        {`${new Date(
                          booking.startingDate
                        ).toLocaleDateString()}`}{" "}
                        to{" "}
                        {`${new Date(booking.endingDate).toLocaleDateString()}`}</td>
                        <td>
                        
                          <span
                            className={`badge ${
                              booking.bookingStatus === 'Confirmed booking'
                                ? 'bg-success'
                                : booking.bookingStatus === 'Rejected by admin'
                                ? 'bg-danger'
                                : booking.bookingStatus === 'Confirmed by admin'
                                ? 'bg-warning'
                                : booking.bookingStatus === 'Cancelled by client'
                                ? 'bg-danger'
                                : 'bg-secondary'
                            }`}
                          >
                            {booking.bookingStatus}
                          </span>
                        </td>
                        <td>${booking.totalCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Background>
  );
};

export default BookingHistory;
