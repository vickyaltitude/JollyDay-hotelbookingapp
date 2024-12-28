import React,{useState} from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const PropertyModal = ({ show, onClose, property, onBook }) => {


  const [bookingOrder,setBookingOrder] = useState({
       numberOfRooms: 0,
       numberOfGuests: 0,
       startingDate: '',
       endingDate: '',
       totalCost: 0
  })

  const [error,setError] = useState(null)
  const [successMsg,setSuccessMsg] = useState(null)
 

  const handleEventValueChange = (e) =>{
      
       const {name,value} = e.target;

       if(name === 'endingDate'){
        const totalCount = ((new Date(value) - new Date(bookingOrder.startingDate)) / (1000 * 60 * 60 * 24)) * property.ppn;
       
          setBookingOrder((previous)=> ({
            ...previous,totalCost: totalCount,[name] : value
          }))
       }else{


        setBookingOrder({
            ...bookingOrder,[name]:value
        })

       }

   

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(bookingOrder.numberOfRooms > property.roomsAvailable){
      setSuccessMsg(null)
      setError('Booking rooms cannot be more than available rooms!')
      return
    }else if(new Date(bookingOrder.endingDate) <= new Date(bookingOrder.startingDate)){
      setSuccessMsg(null)
      setError('Booking day should be minimum 1')
      return
    }else if(new Date() > new Date(bookingOrder.startingDate) ){
      setSuccessMsg(null)
      setError('Date should be in future')
      return
    }

    setError(null)
    setSuccessMsg('Booking confirmed! Please visit booking summary page to make payment...')
    
      onBook(property,bookingOrder)
   
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        style={{
          background: 'linear-gradient(to right, #6a11cb, #2575fc)', 
          color: 'white',
        }}
      >
        <Modal.Title style={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
          {property.propertyName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#f8f9fa' }}>
        <p>
          <strong style={{ color: '#6a11cb' }}>📍 Location:</strong>{' '}
          {property.propertyAddress}
        </p>
        <p>
          <strong style={{ color: '#32CD32' }}>🛏️ Rooms Available:</strong>{' '}
          {property.roomsAvailable}
        </p>
        <p>
          <strong style={{ color: '#FF4500' }}>💲 Price per Night:</strong> $
          {property.ppn}
        </p>
        <p>
          <strong style={{ color: '#FFD700' }}>
            ⚠️ PLEASE READ THE RULES CAREFULLY:
          </strong>
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          <li>
            1. Drinking is{' '}
            {property.propertyRules.alcoholAllowed ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>Allowed</span>
            ) : (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Not Allowed</span>
            )}
            {' '}within our premises
          </li>
          <li>
            2. Smoking is{' '}
            {property.propertyRules.smokeAllowed ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>Allowed</span>
            ) : (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Not Allowed</span>
            )}
            {' '}within our premises
          </li>
          <li>
            3. Couples are{' '}
            {property.propertyRules.coupleFriendly ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>Welcome to our property</span>
            ) : (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Not Allowed</span>
            )}
          </li>
          <li>
            4. Outside visitors are{' '}
            {property.propertyRules.visitorsAllowed ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>Allowed</span>
            ) : (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Not Allowed</span>
            )}
            {' '}to our property
          </li>
          <li>
            5. Local ID is{' '}
            {property.propertyRules.localIdAllowed ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>Allowed</span>
            ) : (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Not Allowed</span>
            )}
          </li>
          <li>
            6. Pets{' '}
            {property.propertyRules.petsAllowed ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>Allowed</span>
            ) : (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Not Allowed</span>
            )}
            {' '}in our property
          </li>
        </ul>

        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formRooms" className="mb-3">
            <Form.Label style={{ color: '#6a11cb', fontWeight: 'bold' }}>
              🛏️ Number of Rooms
            </Form.Label>
            <Form.Control
            name='numberOfRooms'
              type="number"
              onChange={(e) => handleEventValueChange(e)}
              value={bookingOrder.numberOfRooms}
              min="1"
              required
              placeholder="Enter number of rooms"
            />
          </Form.Group>

          <Form.Group controlId="formGuests" className="mb-3">
            <Form.Label style={{ color: '#32CD32', fontWeight: 'bold' }}>
              👥 Number of Guests
            </Form.Label>
            <Form.Control
            name='numberOfGuests'
            value={bookingOrder.numberOfGuests}
            onChange={(e) => handleEventValueChange(e)}
              type="number"
              min="1"
              required
              placeholder="Enter number of guests"
            />
          </Form.Group>

          <Form.Group controlId="formDates" className="mb-3">
            <Form.Label style={{ color: '#FF4500', fontWeight: 'bold' }}>
              📅 Dates
            </Form.Label>
            <Form.Control name='startingDate' onChange={(e) => handleEventValueChange(e)}  value={bookingOrder.startingDate} type="date" required className="mb-2" />
            <Form.Control name='endingDate' onChange={(e) => handleEventValueChange(e)} value={bookingOrder.endingDate} type="date" required />
          </Form.Group>

          <Form.Group controlId="formTotal" className="mb-3">
            <Form.Label style={{ color: '#FF4500', fontWeight: 'bold' }}>
            💲 Total Cost <span>{bookingOrder.totalCost}</span>
            </Form.Label>
               
          </Form.Group>

          {error && <Alert variant='danger'>{error}</Alert>}
          
    {successMsg && <Alert variant='success'>{successMsg}</Alert>}
          <Button
            type="submit"
            variant="success"
            disabled={successMsg ? true : false}
            className="w-100 rounded-pill"
            style={{
              background: 'linear-gradient(to right, #43e97b, #38f9d7)',
              border: 'none',
              fontWeight: 'bold',
            }}
          >
            Confirm Booking
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        }}
      >
        <Button  variant="light" onClick={onClose} className="rounded-pill">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PropertyModal;
