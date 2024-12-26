import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Background from '../UI/Background';

const SignupPage = () => {

  const [formData, setFormData] = useState({
    platformId: '',
    username: '',
    userContact: '',
    email: '',
    address: '',
    businessLocation: '',
    ownerContact: '',
    yearsInBusiness: '',
    ownerName: ''
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
   
  };

  return (
    <Background>

      <Container className="w-100 d-flex justify-content-center align-items-center mt-5 mb-5" style={{ minHeight: '100vh' }}>
        <Row className="w-100"> 
          <Col xs={12}  className="d-flex justify-content-center">
            <Card
              className="shadow-lg p-4 rounded"
              style={{
                backgroundColor: '#343a40',
                color: 'white',
                maxWidth: '600px', 
                width: '100%'     
              }}
            >
              <Card.Body>
                <h3 className="text-center mb-4">Admin Signup</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formPlatformId">
                    <Form.Label>Platform ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="platformId"
                      value={formData.platformId}
                      onChange={handleChange}
                      placeholder="Enter Platform ID"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter Username"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formUserContact">
                    <Form.Label>User Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="userContact"
                      value={formData.userContact}
                      onChange={handleChange}
                      placeholder="Enter User Contact Number"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formAddress">
                    <Form.Label>Communication Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter Communication Address"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBusinessLocation">
                    <Form.Label>Business Property Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="businessLocation"
                      value={formData.businessLocation}
                      onChange={handleChange}
                      placeholder="Enter Business Property Location"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formOwnerContact">
                    <Form.Label>Owner Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="ownerContact"
                      value={formData.ownerContact}
                      onChange={handleChange}
                      placeholder="Enter Owner Contact Number"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formYearsInBusiness">
                    <Form.Label>How Long in Business</Form.Label>
                    <Form.Control
                      type="text"
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                      placeholder="Enter Number of Years in Business"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formOwnerName">
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Enter Owner Name"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" block>
                    Sign Up
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

export default SignupPage;
