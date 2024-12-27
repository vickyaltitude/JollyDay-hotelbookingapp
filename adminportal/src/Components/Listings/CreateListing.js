import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Background from '../UI/Background';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { propertyReducerActions } from '../../store/propertyReducer';

const CreateListing = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dipatch = useDispatch()
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const adminToken = useSelector(state => state.admin.adminAuthToken);
  const properties = useSelector(state => state.property.properties)
  const [isLoading,setIsLoading] = useState(false)
  const [dataMsg,setDataMsg] = useState(null)

  const [formData, setFormData] = useState({
    propertyName: '',
    propertyAddress: '',
    ppn: '',
    roomsAvailable: '',
    propertyCategory: '',
    propertyImages: [],
    coupleFriendly: '',
    drinkingAllowed: '',
    smokingAllowed: '',
    visitorsAllowed: '',
    localIdAllowed: '',
    petsAllowed: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        propertyImages: files,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.propertyName.trim()) {
          newErrors.propertyName = 'Property name is required';
        }
        break;
      case 2:
        if (!formData.propertyAddress.trim()) {
          newErrors.propertyAddress = 'Property address is required';
        }
        break;
      case 3:
        if (!formData.ppn.trim()) {
          newErrors.ppn = 'Price per night is required';
        }
        break;
      case 4:
        if (!formData.roomsAvailable.trim()) {
          newErrors.roomsAvailable = 'Number of rooms available is required';
        }
        break;
      case 5:
        if (!formData.propertyCategory.trim()) {
          newErrors.propertyCategory = 'Property category is required';
        }
        break;
      case 6:
        if (!formData.propertyImages || formData.propertyImages.length === 0) {
          newErrors.propertyImages = 'At least one image is required';
        }
        break;
      case 7:
        if (!formData.coupleFriendly || !formData.drinkingAllowed || !formData.smokingAllowed || !formData.visitorsAllowed || !formData.localIdAllowed || !formData.petsAllowed) {
          newErrors.propertyRules = 'All rules must be selected';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      if (step < 8) {
        setStep(step + 1);
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    if (adminToken !== null) {
      setIsTokenChecked(true);
    } else if (isTokenChecked) {
      navigate('/admin/login');
    }
  }, [adminToken, navigate, isTokenChecked]);

  if (!isTokenChecked) {
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

  const handlePropertyDataClick = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true)
    const formDataToServer = new FormData();

    if (formData.propertyImages && formData.propertyImages.length > 0) {
      formData.propertyImages.forEach((file) => {
        formDataToServer.append('images[]', file);
      });
    }
    formDataToServer.append('adminToken',localStorage.getItem('adminAuthToken'))
    formDataToServer.append('propertyName', formData.propertyName);
    formDataToServer.append('propertyAddress', formData.propertyAddress);
    formDataToServer.append('ppn', formData.ppn);
    formDataToServer.append('roomsAvailable', formData.roomsAvailable);
    formDataToServer.append('propertyCategory', formData.propertyCategory);
    formDataToServer.append('coupleFriendly', formData.coupleFriendly);
    formDataToServer.append('drinkingAllowed', formData.drinkingAllowed);
    formDataToServer.append('smokingAllowed', formData.smokingAllowed);
    formDataToServer.append('visitorsAllowed', formData.visitorsAllowed);
    formDataToServer.append('localIdAllowed', formData.localIdAllowed);
    formDataToServer.append('petsAllowed', formData.petsAllowed);

    fetch('http://localhost:8000/admin/addproperty',{
      method: 'POST',
      body: formDataToServer, 

    }).then(resp =>{
       return resp.json()
    }).then(resp =>{

     
       console.log('property uploaded successfully',resp)
       let newProperties = [...properties,resp.storedNewProperty]
       dipatch(propertyReducerActions.setProperties(newProperties))
       setIsLoading(false)
       setDataMsg(resp.message)
       setFormData({
        propertyName: '',
        propertyAddress: '',
        ppn: '',
        roomsAvailable: '',
        propertyCategory: '',
        propertyImages: [],
        coupleFriendly: '',
        drinkingAllowed: '',
        smokingAllowed: '',
        visitorsAllowed: '',
        localIdAllowed: '',
        petsAllowed: '',
      })
      navigate('/admin/view-listings')

    }).catch(err =>{

         
         console.log(err)
         setIsLoading(false)
         setDataMsg(`Something went wrong Please try again or refresh the app`)


    })


  };

  return (
    <Background>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={6} style={{ paddingTop: '50px' }}>
            <Card style={{ backgroundColor: '#212529', color: 'white', borderRadius: '10px', padding: '30px' }}>
              <Card.Body>
                <h3 className="text-center mb-4">Create New Property</h3>
              {isLoading &&  <h4 style={{color:'yellow'}}>Uploading new property... </h4>} 
              {dataMsg &&  <h4 style={{color:dataMsg === 'successfully added new property' ? 'green' : 'red' }}>{dataMsg} </h4>} 
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
                          required
                        />
                        {errors.propertyName && <div style={{ color: 'red' }}>{errors.propertyName}</div>}
                      </Form.Group>
                      <Button variant="light" onClick={handleNext} block style={{ marginTop: '20px' }}>
                        Next
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <Form.Group controlId="address">
                        <Form.Label>Property Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="propertyAddress"
                          value={formData.propertyAddress}
                          onChange={handleChange}
                          placeholder="Enter property address"
                          required
                        />
                        {errors.propertyAddress && <div style={{ color: 'red' }}>{errors.propertyAddress}</div>}
                      </Form.Group>
                      <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>
                        Previous
                      </Button>
                      <Button variant="light" onClick={handleNext} style={{ marginTop: '20px' }}>
                        Next
                      </Button>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <Form.Group controlId="pricePerNight">
                        <Form.Label>Price per Night</Form.Label>
                        <Form.Control
                          type="number"
                          name="ppn"
                          value={formData.ppn}
                          onChange={handleChange}
                          placeholder="Enter price per night"
                          required
                        />
                        {errors.ppn && <div style={{ color: 'red' }}>{errors.ppn}</div>}
                      </Form.Group>
                      <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>
                        Previous
                      </Button>
                      <Button variant="light" onClick={handleNext} style={{ marginTop: '20px' }}>
                        Next
                      </Button>
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
                          required
                        />
                        {errors.roomsAvailable && <div style={{ color: 'red' }}>{errors.roomsAvailable}</div>}
                      </Form.Group>
                      <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>
                        Previous
                      </Button>
                      <Button variant="light" onClick={handleNext} style={{ marginTop: '20px' }}>
                        Next
                      </Button>
                    </div>
                  )}

                  {step === 5 && (
                    <div>
                      <Form.Group controlId="category">
                        <Form.Label>Property Category</Form.Label>
                        <Form.Control
                          as="select"
                          name="propertyCategory"
                          value={formData.propertyCategory}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select category</option>
                          <option value="villa">Villa</option>
                          <option value="apartment">Apartment</option>
                          <option value="boathouse">Boathouse</option>
                          <option value="hotel">Hotel</option>
                        </Form.Control>
                        {errors.propertyCategory && <div style={{ color: 'red' }}>{errors.propertyCategory}</div>}
                      </Form.Group>
                      <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>
                        Previous
                      </Button>
                      <Button variant="light" onClick={handleNext} style={{ marginTop: '20px' }}>
                        Next
                      </Button>
                    </div>
                  )}

                  {step === 6 && (
                    <div>
                      <Form.Group controlId="images">
                        <Form.Label>Property Images</Form.Label>
                        <Form.Control
                          type="file"
                          name="propertyImages"
                          onChange={handleFileChange}
                          multiple
                          required
                        />
                        {errors.propertyImages && <div style={{ color: 'red' }}>{errors.propertyImages}</div>}
                      </Form.Group>
                      <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>
                        Previous
                      </Button>
                      <Button variant="success" onClick={handleNext} block style={{ marginTop: '20px' }}>
                        Next
                      </Button>
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Form.Control>
                      </Form.Group>

                      {errors.propertyRules && <div style={{ color: 'red' }}>{errors.propertyRules}</div>}
                      <Button variant="secondary" onClick={handlePrev} className="mr-2" style={{ marginTop: '20px' }}>
                        Previous
                      </Button>
                      <Button variant="success" onClick={handlePropertyDataClick} block style={{ marginTop: '20px' }}>
                        Submit Listing
                      </Button>
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
