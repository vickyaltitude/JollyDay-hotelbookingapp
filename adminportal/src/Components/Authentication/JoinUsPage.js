import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Background from '../UI/Background'; 

const JoinUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: ''
  });

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!formData.name || !formData.contactNumber || !formData.email) {
      setErrorMessage('Please fill all the fields.');
      setMessage('');
    } else {
      setMessage('Thank you for reaching out! We will contact you soon to make a deal.');
      setErrorMessage('');
      setFormData({ name: '', contactNumber: '', email: '' });  // Clear the form
    }
  };

  return (
    <Background>
      <Container className="text-white py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg" style={{color:'whitesmoke', borderRadius: '10px', padding: '30px', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
              <Card.Body>
           
                <h2 className="text-center mb-4">Why List Your Property With Us?</h2>
                <p className="text-justify">
                  At <strong>Our Platform</strong>, we provide the perfect opportunity to showcase your property to a global audience.
                  Listing your property with us is quick and easy. We offer competitive prices, detailed analytics, and a user-friendly interface to help you manage your listings. Join us today to increase visibility and attract the right customers!
                </p>
                <p className="text-justify">
                  <strong>Why Choose Us?</strong>
                  <ul>
                    <li>Worldwide exposure to millions of potential customers.</li>
                    <li>Quick listing process with easy-to-use tools.</li>
                    <li>24/7 customer support for property owners.</li>
                    <li>Flexible pricing and payment options.</li>
                    <li>Professional property management features.</li>
                  </ul>
                </p>
                
             
                <h3 className="text-center mb-4">Ready to List Your Property?</h3>
                {message && <Alert variant="success">{message}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="contactNumber" className="mt-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" block className="mt-4">
                    Submit Details
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Background>
  );
};

export default JoinUsPage;
