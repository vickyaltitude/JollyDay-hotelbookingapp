
import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container, Carousel } from 'react-bootstrap';
import PropertyModal from './PropertyModal';
import Background from '../UI/Background';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ApiHandler from '../../ApiHandler';
import { bookingOrderReducerActions } from '../../store/bookingorder';


const ExplorePage = () => {

  const [modalShow, setModalShow] = useState(false); 
  const [selectedProperty, setSelectedProperty] = useState(null);
  const bookingOrders = useSelector(state => state.bookings.bookings);
   const dispatch = useDispatch();
  const clientToken = useSelector(state => state.client.clientToken);
  const properties = useSelector(state => state.propertyClient.properties);
  const sortProperty = useSelector(state => state.propertyClient.sortProperty);
  const sortedProperty = properties.filter(list => list.propertyCategory === sortProperty);
  const navigate = useNavigate()
  

  useEffect(()=>{

    if(!clientToken){
     
        navigate('/client/login')
    }


  },[clientToken])


  const handleBookNowClick = (property) => {
    setSelectedProperty(property); 
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedProperty(null); 
  };

  const handleBooking = (property,bookingDetails) => {
     
    console.log(property,bookingDetails)
    const optionsObj = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({property,bookingDetails,clientToken: localStorage.getItem('clientAuthToken')})
    }
   ApiHandler('http://localhost:8000/client/newbooking',optionsObj).then(resp =>{

       console.log(resp)
       dispatch(bookingOrderReducerActions.setBookings([...bookingOrders,resp.booking]))

   }).catch(err =>{

        console.log(err)

   })

  };


  return (
    <Background>
    <Container className="mt-5">
      <h2 className="text-center text-light mb-5" style={{ fontSize: '3rem', fontWeight: '600' }}>
        Explore Our Properties
      </h2>

      <Row>
        {sortedProperty.map((property) => (
          <Col key={property._id} sm={12} md={6} lg={4} className="mb-4">
            <Card bg="dark" text="light" className="h-100 shadow-lg border-0 rounded-4">
  <Carousel>
    {property.propertyImages.map((image, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          style={{ minHeight: '350px', maxHeight: '350px', objectFit: 'cover' }}
          src={image}
          alt={`${property.propertyName} image`}
        />
      </Carousel.Item>
    ))}
  </Carousel>

  <Card.Body>
    <Card.Title
      style={{
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        textShadow: '1px 1px 5px black',
      }}
    >
      {property.propertyName}
    </Card.Title>
    <Card.Text
      style={{
        fontSize: '1.1rem',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <span style={{ color: '#00FFFF', fontWeight: 'bold' }}>🌍 Location:</span> {property.propertyAddress}
      <br />
      <span style={{ color: '#32CD32', fontWeight: 'bold' }}>🏨 Rooms Available:</span> {property.roomsAvailable}
      <br />
      <span style={{ color: '#FF4500', fontWeight: 'bold' }}>💲 Price per Night:</span> Rs.{property.ppn}
    </Card.Text>
    <div className="d-flex justify-content-center">
      <Button
        variant="warning"
        size="lg"
        className="rounded-pill fw-bold text-dark"
        onClick={() => handleBookNowClick(property)}
        style={{
          background: 'linear-gradient(to right, #f7c947, #f6a02d)',
          border: 'none',
        }}
      >
        Book Now
      </Button>
    </div>
  </Card.Body>
</Card>

          </Col>
        ))}
      </Row>

   
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
