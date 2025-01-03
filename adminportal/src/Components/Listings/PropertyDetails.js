import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Form, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Background from '../UI/Background';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ApiHandler from '../../ApiHandler';
import { propertyReducerActions } from '../../store/propertyReducer';

const PropertyDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.property.propertyLoading);
  const property = useSelector(state => state.property.properties);

  const currentProperty = property.filter(list => list._id === id);
  const [valueChange, setValueChange] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    

    const optionsObj = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({valueChange,id:id})
    }

    
    
     ApiHandler('http://localhost:8000/admin/editproperty',optionsObj).then(resp =>{

          console.log(resp)
          let newProperty = property.map(list => list._id === id ? resp.updatedProperty : list)
          dispatch(propertyReducerActions.setProperties(newProperty))
         

     }).catch(err =>{

        console.log(err)

     })


    setIsEditing(false)
  };

  const handleDeleteProperty = () => {
 
    const optObj = {
        method: 'DELETE',

    }

    ApiHandler(`http://localhost:8000/admin/deleteproperty/${id}`,optObj).then(resp =>{
        console.log(resp)
        const newProperties = property.filter(list => list._id !== id)
        dispatch(propertyReducerActions.setProperties(newProperties))
        navigate('/backend/view-listings'); 
    }).catch(err =>{
        console.log(err)
    })
    
  };

  useEffect(() => {
    if (!isLoading) {
      setValueChange({
        propertyName: currentProperty[0].propertyName,
        propertyAddress: currentProperty[0].propertyAddress,
        propertyCategory: currentProperty[0].propertyCategory,
        availableRooms:  currentProperty[0].roomsAvailable,
        ppn: currentProperty[0].ppn,
        coupleFriendly: currentProperty[0].propertyRules.coupleFriendly ? 'Yes' : 'No', 
        drinkingsAllowed: currentProperty[0].propertyRules.alcoholAllowed ? 'Yes' : 'No',
        smokingAllowed: currentProperty[0].propertyRules.smokeAllowed ? 'Yes' : 'No',
        visitorsAllowed: currentProperty[0].propertyRules.visitorsAllowed ? 'Yes' : 'No',
        localIdAllowed: currentProperty[0].propertyRules.localIdAllowed ? 'Yes' : 'No',
        petsAllowed: currentProperty[0].propertyRules.petsAllowed ? 'Yes' : 'No'
      });
    }
  }, [isLoading]);

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
      <Container className="py-5" style={{ color: 'whitesmoke', borderRadius: '10px', padding: '30px' }}>
        <Row>
          <Col md={6}>
            <Card className="mb-4" style={{ border: 'none', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
              <Carousel interval={3000}>
                {currentProperty.length > 0 &&   currentProperty[0].propertyImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 h-100"
                      style={{ maxHeight: '500px', borderRadius: '10px' }}
                      src={image}
                      alt={`Image ${index + 1} of ${currentProperty[0].propertyName}`}
                    />
                  </Carousel.Item>
                ))}
              
              </Carousel>
            </Card>
          </Col>

          <Col md={6}>
            <Card
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              }}
            >
              {currentProperty.length > 0 && <Card.Body>
                <Card.Title
                  style={{
                    fontSize: '1.8rem',
                    color: '#ffb74d',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                  }}
                >
                  {currentProperty[0].propertyName}
                </Card.Title>
                <Card.Text>
                  <strong>Category: </strong>
                  <span style={{ color: '#ffeb3b' }}>{currentProperty[0].propertyCategory.toUpperCase()}</span>
                </Card.Text>
                <Card.Text>
                  <strong>Price per Night: </strong>
                  <span style={{ color: '#4caf50' }}>${currentProperty[0].ppn}</span>
                </Card.Text>
                <Card.Text>
                    <strong>Available rooms: </strong>
                    <span style={{ color: '#4caf50' }}>
                    {currentProperty[0].roomsAvailable}
                    </span>
                </Card.Text>
                        <Card.Text>
                    <strong>Couple Friendly: </strong>
                    <span style={{ color: currentProperty[0].propertyRules.coupleFriendly ? '#4caf50' : '#f44336' }}>
                    {currentProperty[0].propertyRules.coupleFriendly ? 'Yes' : 'No'}
                    </span>
                </Card.Text>
                <Card.Text>
                    <strong>Drinkings Allowed: </strong>
                    <span style={{ color: currentProperty[0].propertyRules.alcoholAllowed ? '#4caf50' : '#f44336' }}>
                    {currentProperty[0].propertyRules.alcoholAllowed ? 'Yes' : 'No'}
                    </span>
                </Card.Text>
                <Card.Text>
                    <strong>Smoking Allowed: </strong>
                    <span style={{ color: currentProperty[0].propertyRules.smokeAllowed ? '#4caf50' : '#f44336' }}>
                    {currentProperty[0].propertyRules.smokeAllowed ? 'Yes' : 'No'}
                    </span>
                </Card.Text>
                <Card.Text>
                    <strong>Visitors Allowed: </strong>
                    <span style={{ color: currentProperty[0].propertyRules.visitorsAllowed ? '#4caf50' : '#f44336' }}>
                    {currentProperty[0].propertyRules.visitorsAllowed ? 'Yes' : 'No'}
                    </span>
                </Card.Text>
              
                <Card.Text>
                    <strong>Local ID Allowed: </strong>
                    <span style={{ color: currentProperty[0].propertyRules.localIdAllowed ? '#4caf50' : '#f44336' }}>
                    {currentProperty[0].propertyRules.localIdAllowed ? 'Yes' : 'No'}
                    </span>
                </Card.Text>
                <Card.Text>
                    <strong>Property Address: </strong>
                    <span style={{ color: '#4caf50'}}>
                    {currentProperty[0].propertyAddress}
                    </span>
                </Card.Text>
                <Card.Text style={{ fontSize: '1rem', marginTop: '15px' }}>
                    {!currentProperty[0].propertyRules.petsAllowed ? (
                    <strong style={{ color: '#f44336' }}>
                        Please note pets are not allowed within our premises.
                    </strong>
                    ) : (
                    <strong style={{ color: '#4caf50' }}>
                        Your pets are allowed within our premises.
                    </strong>
                    )}
                </Card.Text>
               
                <Button
                  variant="warning"
                  onClick={() => setIsEditing(true)}
                  block
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: '#ffc107',
                    borderColor: '#ffc107',
                  }}
                >
                  Edit Property
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteProperty}
                  block
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: '#f44336',
                    borderColor: '#f44336',
                  }}
                >
                  Remove Property
                </Button>
              </Card.Body>}
              
            </Card>
          </Col>
        </Row>
      </Container>

    
      <Modal show={isEditing} onHide={() => setIsEditing(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={handleSaveChanges}>
            <Form.Group controlId="formPropertyName">
              <Form.Label>Property Name</Form.Label>
              <Form.Control
               required
                type="text"
                value={valueChange.propertyName}
                onChange={(e) => setValueChange({ ...valueChange, propertyName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPropertyCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
               required
                as="select"
                value={valueChange.propertyCategory}
                onChange={(e) => setValueChange({ ...valueChange, propertyCategory: e.target.value })}
              >
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="boathouse">Boathouse</option>
                <option value="hotel">Hotel</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPricePerNight">
              <Form.Label>Price per Night</Form.Label>
              <Form.Control
               required
                type="number"
                value={valueChange.ppn}
                onChange={(e) => setValueChange({ ...valueChange, ppn: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCoupleAllowed">
              <Form.Label>Couples Allowed</Form.Label>
              <Form.Control
               required
                type="text"
                value={valueChange.coupleFriendly}
                onChange={(e) => setValueChange({ ...valueChange, coupleFriendly: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPropertyAddress">
              <Form.Label>Property Address</Form.Label>
              <Form.Control
              required
                type="text"
                value={valueChange.propertyAddress}
                onChange={(e) => setValueChange({ ...valueChange, propertyAddress: e.target.value })}
              />
            </Form.Group> 
            <Form.Group controlId="formAvailableRooms">
              <Form.Label>Available rooms</Form.Label>
              <Form.Control
              required
                type="Number"
                value={valueChange.availableRooms}
                onChange={(e) => setValueChange({ ...valueChange, availableRooms: e.target.value })}
              />
            </Form.Group> 
            <Form.Group controlId="formAlcoholAllowed">
              <Form.Label>Alcohol Allowed</Form.Label>
              <Form.Control
               required
                type="text"
                value={valueChange.drinkingsAllowed}
                onChange={(e) => setValueChange({ ...valueChange, drinkingsAllowed: e.target.value })}
              />
            </Form.Group>  <Form.Group controlId="formSmokingAllowed">
              <Form.Label>Smoking Allowed</Form.Label>
              <Form.Control
               required
                type="text"
                value={valueChange.smokingAllowed}
                onChange={(e) => setValueChange({ ...valueChange, smokingAllowed: e.target.value })}
              />
            </Form.Group>  <Form.Group controlId="formVisitorsAllowed">
              <Form.Label>Visitors Allowed</Form.Label>
              <Form.Control
               required
                type="text"
                value={valueChange.visitorsAllowed}
                onChange={(e) => setValueChange({ ...valueChange, visitorsAllowed: e.target.value })}
              />
            </Form.Group>  <Form.Group controlId="formLocalIdAllowed">
              <Form.Label>localIdAllowed</Form.Label>
              <Form.Control
               required
                type="text"
                value={valueChange.localIdAllowed}
                onChange={(e) => setValueChange({ ...valueChange, localIdAllowed: e.target.value })}
              />
            </Form.Group>  
            <Form.Group controlId="formPetsAllowed">
              <Form.Label>Pets Allowed</Form.Label>
              <Form.Control
              required
                type="text"
                value={valueChange.petsAllowed}
                onChange={(e) => setValueChange({ ...valueChange, petsAllowed: e.target.value })}
              />
            </Form.Group> 
           
            <Button
              variant="success"
              type='submit'
              block
              style={{
                marginTop: '20px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                background: '#4caf50',
                borderColor: '#4caf50',
              }}
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Background>
  );
};

export default PropertyDetails;
