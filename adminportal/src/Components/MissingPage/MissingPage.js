// Components/NotFound/MissingPage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MissingPage = () => {
  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <h1 className="display-4">404</h1>
          <h2>Oops! Page Not Found</h2>
          <p>The page you are looking for might have been moved or doesn't exist.</p>
          <Link to="/backend/home">
            <Button variant="primary" size="lg">Go to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default MissingPage;
