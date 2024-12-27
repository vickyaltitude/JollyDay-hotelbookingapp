import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Background from '../UI/Background';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const PropertyDetails = () => {
  const { id } = useParams(); 
  console.log(id)
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.property.propertyLoading)
  const currentProperty = useSelector(state => 
    state.property.properties
  );
 
  console.log(currentProperty)
  
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = () => {
  
    console.log('Changes saved!');
    setIsEditing(false);
  };

  const handleDeleteProperty = () => {
  
    console.log('Property deleted!');
    navigate('/admin/listings'); 
  };




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
      <Container className="text-white py-5">
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Carousel interval={3000}>
                {currentProperty[0].propertyImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100 h-100" style={{maxHeight:'500px'}} src={image} alt={`Image ${index + 1} of ${currentProperty[0].propertyName}`} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>
              <Card.Body>
                <Card.Title>{currentProperty[0].propertyName}</Card.Title>
                <Card.Text>
                  <strong>Category: </strong>{currentProperty[0].propertyCategory}
                </Card.Text>
                <Card.Text>
                  <strong>Price per Night: </strong>${currentProperty[0].ppn}
                </Card.Text>
                <Card.Text>
                  <strong>Drinkings Allowed: </strong>{currentProperty[0].propertyRules.alcoholAllowed ? 'Yes' : 'No'}
                </Card.Text>

                <Button variant="warning" onClick={() => setIsEditing(true)} block >
                  Edit Property
                </Button>
                <Button variant="danger" onClick={handleDeleteProperty} block>
                  Remove Property
                </Button>
              </Card.Body>
            </Card>

        
            {isEditing && (
              <Card className="mt-4">
                <Card.Body>
                  <h5>Edit Property</h5>
                  <Form>
                    <Form.Group controlId="formPropertyName">
                      <Form.Label>Property Name</Form.Label>
                      <Form.Control type="text" defaultValue={currentProperty[0].propertyName} />
                    </Form.Group>
                    <Form.Group controlId="formPropertyCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Control as="select" defaultValue={currentProperty[0].propertyCategory}>
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="boathouse">Boathouse</option>
                        <option value="hotel">Hotel</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPricePerNight">
                      <Form.Label>Price per Night</Form.Label>
                      <Form.Control type="number" defaultValue={currentProperty[0].ppn} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                      <Form.Label>Drinkings Allowed</Form.Label>
                      <Form.Control as="textarea" rows={3} defaultValue={currentProperty[0].propertyRules.alcoholAllowed ? 'Yes' : 'No'} />
                    </Form.Group>

                    <Button variant="success" onClick={handleSaveChanges} block style={{ marginTop: '20px' }}>
                      Save Changes
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Background>
  );
};

export default PropertyDetails;
