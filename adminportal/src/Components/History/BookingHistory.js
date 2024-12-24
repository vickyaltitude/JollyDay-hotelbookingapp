import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import Background from '../UI/Background';

const BookingHistory = () => {
  const bookings = [
    {
      id: 1,
      propertyName: 'Oceanfront Villa',
      customerName: 'John Doe',
      status: 'Confirmed and Paid',
      bookingDate: '2024-11-15',
      totalAmount: 600,
    },
    {
      id: 2,
      propertyName: 'City Center Apartment',
      customerName: 'Jane Smith',
      status: 'Waiting for Payment',
      bookingDate: '2024-11-20',
      totalAmount: 300,
    },
    {
      id: 3,
      propertyName: 'Luxury Boathouse',
      customerName: 'Sarah Johnson',
      status: 'Confirmed but Rejected by Customer',
      bookingDate: '2024-11-22',
      totalAmount: 500,
    },
    {
      id: 4,
      propertyName: '5-Star Hotel Suite',
      customerName: 'Michael Brown',
      status: 'Rejected',
      bookingDate: '2024-11-25',
      totalAmount: 700,
    },
    {
      id: 5,
      propertyName: 'Mountain Retreat',
      customerName: 'Emily Davis',
      status: 'Confirmed and Paid',
      bookingDate: '2024-11-30',
      totalAmount: 850,
    },
  ];

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
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.propertyName}</td>
                        <td>{booking.customerName}</td>
                        <td>{booking.bookingDate}</td>
                        <td>
                        
                          <span
                            className={`badge ${
                              booking.status === 'Confirmed and Paid'
                                ? 'bg-success'
                                : booking.status === 'Waiting for Payment'
                                ? 'bg-warning'
                                : booking.status === 'Confirmed but Rejected by Customer'
                                ? 'bg-danger'
                                : 'bg-secondary'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td>${booking.totalAmount}</td>
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
