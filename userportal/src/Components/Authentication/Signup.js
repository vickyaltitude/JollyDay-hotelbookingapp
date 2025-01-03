import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import {NavLink,useNavigate} from 'react-router-dom'
import Background from '../UI/Background';
import ApiHandler from '../../ApiHandler';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact: '',
  });
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [error,setError] = useState(null)


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password.trim().length < 6){
      setSubmitted(false)
      setError('Password should be more than 6 characters')
      return
    }
    setError(null)
    const optionsObj = {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    }
     ApiHandler('http://localhost:8000/client/newuser',optionsObj).then(resp =>{
         console.log(resp)

         if(resp.message === 'User already exist'){

            setError('User already exist! Please login')

         }else if(resp.message === 'Something went wrong with our database... please try again'){
            setError('Something went wrong with our database... please try again')
         }else{
          setError(null)
             setSubmitted(true);
             setTimeout(()=>{
              navigate('/user/login')
             },1000)
         }
     }).catch(err =>{

        console.log(err)
        setError('Something went wrong with our database... please try again')
     })
 
  
  };

  return (
    <Background>
    <Container className="mt-5 pt-5 d-flex justify-content-center">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
        
          <Card bg="dark" text="light" className="shadow-lg border-0">
            <Card.Header className="text-center">
              <h3 style={{ color: 'whitesmoke', fontWeight: 'bold' }}>Sign Up</h3>
            </Card.Header>
            <Card.Body>
        
              {submitted && (
                <Alert variant="success" className="text-center">
                  Sign-up successful! Welcome to JollyDay! Redirecting to login page... 🎉
                </Alert>
              )}

              {error &&  <Alert variant="danger" className="text-center">
                {error}
                </Alert>}

      
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="contact" className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contact"
                    placeholder="Enter your contact number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="text-center">
             
                Already have an account?{' '}
                <NavLink  to="/user/login" style={{ color: '#FFD700'}}>
                  Log in here
                </NavLink>
           
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    </Background>
  );
};

export default Signup;
