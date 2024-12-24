import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Background from '../UI/Background';

const AdminProfile = () => {
  
  const [adminData, setAdminData] = useState({
    profilePic: 'https://via.placeholder.com/150',
    name: 'John Doe',
    contactNumber: '123-456-7890',
    communicationAddress: '123 Main St, City, Country',
    platformId: 'ADMIN1234',
    properties: [
      {
        id: 1,
        propertyName: 'Oceanfront Villa',
        ownerName: 'John Doe',
        ownerContact: '123-456-7890',
        address: '123 Beach Rd, Ocean City, OC12345',
        yearsInBusiness: 5,
      },
    ],
  });


  const [isEditMode, setIsEditMode] = useState(false);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handlePropertyChange = (e, propertyId) => {
    const { name, value } = e.target;
    setAdminData((prevData) => {
      const updatedProperties = prevData.properties.map((property) =>
        property.id === propertyId
          ? { ...property, [name]: value }
          : property
      );
      return { ...prevData, properties: updatedProperties };
    });
  };


  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <Background>
    <Container fluid style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center py-5">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <Row>
              
                <Col md={4} className="text-center">
                  <img
                    src={adminData.profilePic}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <Button variant="primary" onClick={toggleEditMode}>
                    {isEditMode ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </Col>
                <Col md={8}>
              
                  <h3 style={{color:'#3b82f680', fontWeight:'bolder'}}>Admin Personal Details</h3>
                  <Form>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={adminData.name}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactNumber"
                        value={adminData.contactNumber}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Communication Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="communicationAddress"
                        value={adminData.communicationAddress}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Platform ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="platformId"
                        value={adminData.platformId}
                        onChange={handleInputChange}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>

            
              <div className="mt-5">
                <h3 style={{color:'#3b82f680', fontWeight:'bolder'}}>Property Ownership Details</h3>
                {adminData.properties.map((property) => (
                  <Card key={property.id} className="mb-4">
                    <Card.Body>
                      <h4>{property.propertyName}</h4>
                      <Form>
                        <Form.Group>
                          <Form.Label >Owner Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="ownerName"
                            value={property.ownerName}
                            onChange={(e) => handlePropertyChange(e, property.id)}
                            disabled={!isEditMode}
                            
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Owner Contact</Form.Label>
                          <Form.Control
                            type="text"
                            name="ownerContact"
                            value={property.ownerContact}
                            onChange={(e) => handlePropertyChange(e, property.id)}
                            disabled={!isEditMode}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Property Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={property.address}
                            onChange={(e) => handlePropertyChange(e, property.id)}
                            disabled={!isEditMode}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Years in Business</Form.Label>
                          <Form.Control
                            type="number"
                            name="yearsInBusiness"
                            value={property.yearsInBusiness}
                            onChange={(e) => handlePropertyChange(e, property.id)}
                            disabled={!isEditMode}
                          />
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </Background>
  );
};

export default AdminProfile;
