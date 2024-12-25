import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import Background from '../UI/Background';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

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
    setLoginSuccess(true);
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
              <h3 style={{ color: 'white', fontWeight: 'bold' }}>Login</h3>
            </Card.Header>
            <Card.Body>
              {/* Login success message */}
              {loginSuccess && (
                <Alert variant="success" className="text-center">
                  Login successful! Welcome back to JollyDay 🎉
                </Alert>
              )}

              {/* Login Form */}
              <Form onSubmit={handleSubmit}>
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Log In
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="text-center">
              <p className="text-light">
                Don't have an account yet?{' '}
                <a href="/signup" style={{ color: '#FFD700', textDecoration: 'none' }}>
                  Sign up here
                </a>
              </p>
              <p className="text-light">
                Forgot your password?{' '}
                <a href="/forgot-password" style={{ color: '#FFD700', textDecoration: 'none' }}>
                  Reset it here
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

export default Login;
