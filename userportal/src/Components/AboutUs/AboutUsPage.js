import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Background from '../UI/Background';

const AboutUsPage = () => {
  return (
    <Background>
    <Container className="mt-5">
      <Row className="align-items-center">
        {/* Image Section */}
        <Col md={6} className="mb-4">
          <img
            src="https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?cs=srgb&dl=pexels-pixabay-221457.jpg&fm=jpg"
            alt="About Us"
            className="img-fluid rounded shadow-lg"
          />
        </Col>

        {/* Content Section */}
        <Col md={6}>
          <h2 className="text-light mb-4" style={{ fontWeight: '600', fontSize: '2.5rem' }}>
            Welcome to <span style={{ color: '#FFD700' }}>JollyDay</span>
          </h2>
          <p className="text-light lead">
            JollyDay is your ultimate destination for booking hotels, apartments, boathouses, and villas. 
            We specialize in helping you find the perfect getaway, whether it’s a cozy villa in the countryside,
            a luxurious hotel by the beach, or a unique stay in a serene boathouse.
          </p>
          <p className="text-light">
            Our platform is built to provide you with a seamless booking experience, ensuring you find accommodations
            that suit your style and budget. Whether you're traveling solo, planning a family vacation, or organizing
            a group retreat, JollyDay has a wide range of properties to cater to all your needs.
          </p>
        </Col>
      </Row>

      <hr className="my-5 text-light" />

      {/* Feature Section */}
      <Row>
        <Col md={4} className="mb-4">
          <Card bg="dark" text="light" className="h-100 shadow-lg">
            <Card.Body>
              <Card.Title style={{ color: '#FFD700', fontWeight: 'bold' }}>Wide Range of Properties</Card.Title>
              <Card.Text>
                Explore thousands of properties, from luxurious hotels to charming boathouses, tailored to suit every traveler.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card bg="dark" text="light" className="h-100 shadow-lg">
            <Card.Body>
              <Card.Title style={{ color: '#FFD700', fontWeight: 'bold' }}>User-Friendly Platform</Card.Title>
              <Card.Text>
                Our intuitive platform makes booking easy, with a seamless search and checkout process for all users.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card bg="dark" text="light" className="h-100 shadow-lg">
            <Card.Body>
              <Card.Title style={{ color: '#FFD700', fontWeight: 'bold' }}>Customer-Centric Approach</Card.Title>
              <Card.Text>
                Our 24/7 customer support ensures you have help whenever you need it, so you can travel stress-free.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Content Section */}
      <Row className="mt-5">
        <Col>
          <h3 className="text-light mb-4" style={{ fontWeight: '600', fontSize: '2rem' }}>
            Why Choose <span style={{ color: '#FFD700' }}>JollyDay</span>?
          </h3>
          <p className="text-light">
            At JollyDay, we believe that travel should be effortless and enjoyable. Our mission is to provide a 
            platform that connects travelers with the best accommodations, offering:
          </p>
          <ul className="text-light">
            <li>Comprehensive listings with detailed descriptions, images, and reviews.</li>
            <li>Competitive pricing and transparent booking policies.</li>
            <li>Secure payment options and quick confirmation of bookings.</li>
            <li>Personalized recommendations tailored to your preferences.</li>
            <li>Exclusive deals and discounts for our members.</li>
          </ul>
          <p className="text-light">
            With JollyDay, your dream vacation is just a few clicks away. Start exploring today and let us make
            your next trip unforgettable.
          </p>
        </Col>
      </Row>
    </Container>
    </Background>
  );
};

export default AboutUsPage;
