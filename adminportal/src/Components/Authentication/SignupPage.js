import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Background from '../UI/Background';
import ApiHandler from '../../ApiHandler';
import {useNavigate} from 'react-router-dom';

const SignupPage = () => {

    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    platformId: '',
    userName: '',
    userEmail:'',
    userContact: '',
    businessAddress: '',
        ownerName: '',
            yearsInBusiness: '',
    ownerContact: '',
    password: '',
    confirmPassword:''

  });


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
        alert("Password & Confirm Password should be same")
        return
    }else if( formData.password.length < 6){
        alert("Password length should be minimum 6")
        return
    }
  

    const { confirmPassword, ...newUserObject } = formData;

    const sendApiData = {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newUserObject)
    }

   ApiHandler('http://localhost:8000/admin/newadmin',sendApiData).then(resp =>{

        console.log(resp)
        if(resp.message === 'User already exist'){

            alert('User already exist! please login')

        }else if(resp.message === 'User creation success'){
 
         setFormData({
             platformId: '',
             userName: '',
             userEmail:'',
             userContact: '',
             businessAddress: '',
                 ownerName: '',
                     yearsInBusiness: '',
             ownerContact: '',
             password: '',
             confirmPassword:''
         
           })
            alert('User successfully created! Redirecting to login page')
           
             setTimeout(()=>{
                  navigate('/backend/login')
             })
 
        }else if(resp.message === 'Something went wrong with our database... please try again'){
         alert('Something went wrong on our side.. please try again or reload the app')
        }

    }).catch(err =>{
        console.log(err)
    });
   
   
  };

  return (
    <Background>

      <Container className="w-100 d-flex justify-content-center align-items-center mt-5 mb-5" style={{ minHeight: '100vh' }}>
        <Row className="w-100"> 
          <Col xs={12}  className="d-flex justify-content-center">
            <Card
              className="shadow-lg p-4 rounded"
              style={{
                backgroundColor: '#343a40',
                color: 'white',
                maxWidth: '600px', 
                width: '100%'     
              }}
            >
              <Card.Body>
                <h3 className="text-center mb-4">Admin Signup</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formPlatformId">
                    <Form.Label>Platform ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="platformId"
                      value={formData.platformId}
                      onChange={handleChange}
                      placeholder="Enter Platform ID"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="userName"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter Username"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formUserContact">
                    <Form.Label>User Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="userContact"
                      value={formData.userContact}
                      onChange={handleChange}
                      placeholder="Enter User Contact Number"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="userEmail"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formAddress">
                    <Form.Label>Business Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="businessAddress"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter Communication Address"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formOwnerContact">
                    <Form.Label>Owner Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="ownerContact"
                      value={formData.ownerContact}
                      onChange={handleChange}
                      placeholder="Enter Owner Contact Number"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formYearsInBusiness">
                    <Form.Label>How Long in Business</Form.Label>
                    <Form.Control
                      type="text"
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                      placeholder="Enter Number of Years in Business"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formOwnerName">
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Enter Owner Name"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="create password"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter the password"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" block>
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Background>
  );
};

export default SignupPage;
