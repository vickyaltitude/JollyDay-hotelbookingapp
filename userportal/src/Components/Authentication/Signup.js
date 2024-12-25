import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import Background from '../UI/Background';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // You can add backend API logic here
  };

  return (
    <Background>
    <Container className="mt-5 pt-5 d-flex justify-content-center">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          {/* Card Wrapper */}
          <Card bg="dark" text="light" className="shadow-lg border-0">
            <Card.Header className="text-center">
              <h3 style={{ color: 'whitesmoke', fontWeight: 'bold' }}>Sign Up</h3>
            </Card.Header>
            <Card.Body>
              {/* Submission success message */}
              {submitted && (
                <Alert variant="success" className="text-center">
                  Sign-up successful! Welcome to JollyDay 🎉
                </Alert>
              )}

              {/* Sign-Up Form */}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="contact" className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contact"
                    placeholder="Enter your contact number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="text-center">
              <p className="text-light">
                Already have an account?{' '}
                <a href="/login" style={{ color: '#FFD700', textDecoration: 'none' }}>
                  Log in here
                </a>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    </Background>
  );
};

export default Signup;
