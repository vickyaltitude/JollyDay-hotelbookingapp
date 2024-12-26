import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Background from '../UI/Background';
import { useSelector, useDispatch } from 'react-redux';
import { adminReducerActions } from '../../store/adminReducer';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const adminDetails = useSelector(state => state.admin.adminDetails);

  const [adminInput, setAdminInput] = useState({
    userName: '',
    userContact: '',
    platformId: '',
    ownerName: '',
    ownerContact: '',
    businessAddress: '',
    yearsInBusiness: '',
    profilePic: '',  
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
   
    const storedAdminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    if (storedAdminDetails) {
      setAdminInput(storedAdminDetails);
      dispatch(adminReducerActions.setAdminDetails(storedAdminDetails)); 
    } else if (adminDetails) {
      setAdminInput(adminDetails);  
    }
  }, [dispatch]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminInput((prevData) => ({
        ...prevData,
        profilePic: file,
      }));
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {

      const formData = new FormData();
        formData.append('profilePic',adminInput.profilePic);  
        formData.append('userName', adminInput.userName);
        formData.append('userContact', adminInput.userContact);
        formData.append('platformId',adminInput.platformId);
        formData.append('ownerName',adminInput.ownerName);
        formData.append('ownerContact',adminInput.ownerContact);
        formData.append('businessAddress',adminInput.businessAddress);
        formData.append('yearsInBusiness',adminInput.yearsInBusiness);


            fetch('http://localhost:8000/admin/updateadminprofile', {
              method: 'POST',
              body: formData, 
            })
            .then(response => response.json())
            .then(data => {
              console.log('File uploaded successfully:', data);

              setAdminInput({
                ...adminInput,
                userName: data.userDetails.userName,
                userContact: data.userDetails.userContact,
                platformId: data.userDetails.platformId,
                ownerName: data.userDetails.ownerName,
                ownerContact: data.userDetails.ownerContact,
                businessAddress: data.userDetails.businessAddress,
                yearsInBusiness: data.userDetails.yearsInBusiness,
                profilePic: data.userDetails.profilePic, 
              });
               
              dispatch(adminReducerActions.setAdminDetails({
                ...data.userDetails
              }));

              localStorage.setItem('adminDetails', JSON.stringify({
                ...data.userDetails
              }));


            })
            .catch(error => {
              console.error('Error uploading file:', error);
            });


    }
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
                      src={adminInput.profilePic || 'https://via.placeholder.com/150'}
                      alt="Profile"
                      className="img-fluid rounded-circle mb-3"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <Button variant="primary" onClick={toggleEditMode}>
                      {isEditMode ? 'Save Changes' : 'Edit Profile'}
                    </Button>

                 
                    {isEditMode && (
                      <Form.Group className="mt-3">
                        <Form.Label>Change Profile Picture</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </Form.Group>
                    )}
                  </Col>
                  <Col md={8}>
                    <h3 style={{ color: '#3b82f680', fontWeight: 'bolder' }}>Admin Personal Details</h3>
                    <Form>
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="userName"
                          value={adminInput.userName}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="number"
                          name="userContact"
                          value={adminInput.userContact}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Platform ID</Form.Label>
                        <Form.Control
                          type="text"
                          name="platformId"
                          value={adminInput.platformId}
                          onChange={handleInputChange}
                          disabled
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>

                <div className="mt-5">
                  <h3 style={{ color: '#3b82f680', fontWeight: 'bolder' }}>Property Ownership Details</h3>

                  <Card className="mb-4">
                    <Card.Body>
                      <h4>Business Details</h4>
                      <Form>
                        <Form.Group>
                          <Form.Label>Owner Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="ownerName"
                            value={adminInput.ownerName}
                            onChange={handleInputChange}
                            disabled={!isEditMode}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Owner Contact</Form.Label>
                          <Form.Control
                            type="number"
                            name="ownerContact"
                            value={adminInput.ownerContact}
                            onChange={handleInputChange}
                            disabled={!isEditMode}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Property Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="businessAddress"
                            value={adminInput.businessAddress}
                            onChange={handleInputChange}
                            disabled={!isEditMode}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Years in Business</Form.Label>
                          <Form.Control
                            type="number"
                            name="yearsInBusiness"
                            value={adminInput.yearsInBusiness}
                            onChange={handleInputChange}
                            disabled={!isEditMode}
                          />
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
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
