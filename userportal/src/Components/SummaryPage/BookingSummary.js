import React from 'react';
import { Card, Button, ListGroup, Row, Col, Container } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Background from '../UI/Background';
import { useSelector } from 'react-redux';

const BookingSummary = () => {
   
  const bookingItems = useSelector(state => state.bookings.bookings)
  const isLoading = useSelector(state => state.propertyClient.isLoading)
  console.log(bookingItems)


  const handleRemove = (id) => {
    console.log(`Remove item with ID: ${id}`);
    // Logic for removing the property from the booking (e.g., updating the state)
  };

  if (isLoading) {
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
                    <ListGroup.Item key={item._id} className="d-flex justify-content-between align-items-center">
                      <Row className="w-100">
                        <Col xs={12} md={4}>
                          <img src={item.propertyId.propertyImages[0]} alt={item.propertyId.propertyName} style={{minHeight:'250px',maxHeight:'250px'}} className="img-fluid rounded" />
                        </Col>
                        <Col xs={12} md={8} className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5>{item.propertyId.propertyName}</h5>
                            <p className="mb-1"><strong>Location:</strong> {item.propertyId.propertyAddress}</p>
                            <p><strong>Price per Night:</strong> ${item.propertyId.ppn}</p>
                          </div>
                          <div>
                            <h6>Total Price: ${item.totalCost}</h6>
                            {item.bookingStatus === 'Pending Confirmation' ? <Button variant='warning' disabled>Pending Admin Approval</Button> : <>
                            <Button variant="danger" onClick={() => handleRemove(item._id)}>
                              Remove Booking
                            </Button>
                            <Button variant="success">
                              Pay now to confirm
                            </Button> </>}

                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

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
