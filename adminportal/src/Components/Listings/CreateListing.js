import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Background from '../UI/Background';

const CreateListing = () => {

  const [step, setStep] = useState(1);


  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    pricePerNight: '',
    roomsAvailable: '',
    category: '',
    images: [],
    coupleFriendly: '',
    drinkingAllowed: '',
    smokingAllowed: '',
    visitorsAllowed: '',
    localIdAllowed: '',
    petsAllowed: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: [...formData.images, ...e.target.files]
    });
  };

  const handleNext = () => {
    if (step < 8) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Background>
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={6} style={{ paddingTop: '50px' }}>
          <Card style={{ backgroundColor: '#212529', color: 'white', borderRadius: '10px', padding: '30px' }}>
            <Card.Body>
              <h3 className="text-center mb-4">Create New Property</h3>
              <Form>
                {step === 1 && (
                  <div>
                    <Form.Group controlId="propertyName">
                      <Form.Label>Property Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="propertyName"
                        value={formData.propertyName}
                        onChange={handleChange}
                        placeholder="Enter property name"
                      />
                    </Form.Group>
                    <Button variant="light" onClick={handleNext} block style={{ marginTop: '20px' }}>Next</Button>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <Form.Group controlId="address">
                      <Form.Label>Property Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter property address"
                      />
                    </Form.Group>
                    <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>Previous</Button>
                    <Button variant="light" onClick={handleNext} style={{ marginTop: '20px' }}>Next</Button>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <Form.Group controlId="pricePerNight">
                      <Form.Label>Price per Night</Form.Label>
                      <Form.Control
                        type="number"
                        name="pricePerNight"
                        value={formData.pricePerNight}
                        onChange={handleChange}
                        placeholder="Enter price per night"
                      />
                    </Form.Group>
                    <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>Previous</Button>
                    <Button variant="light" onClick={handleNext} style={{ marginTop: '20px' }}>Next</Button>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <Form.Group controlId="roomsAvailable">
                      <Form.Label>Rooms Available</Form.Label>
                      <Form.Control
                        type="number"
                        name="roomsAvailable"
                        value={formData.roomsAvailable}
                        onChange={handleChange}
                        placeholder="Enter number of rooms available"
                      />
                    </Form.Group>
                    <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>Previous</Button>
                    <Button variant="light" onClick={handleNext} style={{ marginTop: '20px' }}>Next</Button>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <Form.Group controlId="category">
                      <Form.Label>Property Category</Form.Label>
                      <Form.Control
                        as="select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select category</option>
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="boathouse">Boathouse</option>
                        <option value="hotel">Hotel</option>
                      </Form.Control>
                    </Form.Group>
                    <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>Previous</Button>
                    <Button variant="light" onClick={handleNext} style={{ marginTop: '20px' }}>Next</Button>
                  </div>
                )}

                {step === 6 && (
                  <div>
                    <Form.Group controlId="images">
                      <Form.Label>Property Images</Form.Label>
                      <Form.Control
                        type="file"
                        name="images"
                        onChange={handleFileChange}
                        multiple
                      />
                    </Form.Group>
                    <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>Previous</Button>
                    <Button variant="success" onClick={handleNext} block style={{ marginTop: '20px' }}>Next</Button>
                  </div>
                )}

                {step === 7 && (
                  <div>
                   
                    <Form.Group controlId="coupleFriendly">
                      <Form.Label>Couple Friendly</Form.Label>
                      <Form.Control
                        as="select"
                        name="coupleFriendly"
                        value={formData.coupleFriendly}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="drinkingAllowed">
                      <Form.Label>Drinking Allowed</Form.Label>
                      <Form.Control
                        as="select"
                        name="drinkingAllowed"
                        value={formData.drinkingAllowed}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="smokingAllowed">
                      <Form.Label>Smoking Allowed</Form.Label>
                      <Form.Control
                        as="select"
                        name="smokingAllowed"
                        value={formData.smokingAllowed}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="visitorsAllowed">
                      <Form.Label>Visitors Allowed</Form.Label>
                      <Form.Control
                        as="select"
                        name="visitorsAllowed"
                        value={formData.visitorsAllowed}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="localIdAllowed">
                      <Form.Label>Local ID Allowed</Form.Label>
                      <Form.Control
                        as="select"
                        name="localIdAllowed"
                        value={formData.localIdAllowed}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="petsAllowed">
                      <Form.Label>Pets Allowed</Form.Label>
                      <Form.Control
                        as="select"
                        name="petsAllowed"
                        value={formData.petsAllowed}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Control>
                    </Form.Group>

                    <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>Previous</Button>
                    <Button variant="success" block style={{ marginTop: '20px' }}>Submit Listing</Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </Background>
  );
};

export default CreateListing;
