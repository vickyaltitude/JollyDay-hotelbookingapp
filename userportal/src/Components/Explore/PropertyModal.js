// PropertyModal.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PropertyModal = ({ show, onClose, property, onBook }) => {
  if (!property) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle booking logic
    onBook();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{property.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Rating:</strong> {property.rating} ★</p>
        <p><strong>Price per Night:</strong> ${property.price}</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRooms">
            <Form.Label>Number of Rooms</Form.Label>
            <Form.Control type="number" min="1" required />
          </Form.Group>

          <Form.Group controlId="formGuests">
            <Form.Label>Number of Guests</Form.Label>
            <Form.Control type="number" min="1" required />
          </Form.Group>

          <Form.Group controlId="formDates">
            <Form.Label>Dates</Form.Label>
            <Form.Control type="date" required />
            <Form.Control type="date" required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Confirm Booking
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PropertyModal;
