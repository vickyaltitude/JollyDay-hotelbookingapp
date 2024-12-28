import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import Background from '../UI/Background';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiHandler from '../../ApiHandler';
import {clientReducerActions} from '../../store/userReducer'
import { useDispatch } from 'react-redux';

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error,setError] = useState(null)


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = (e) => {

    e.preventDefault();
    const optionsObj = {
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    }

    ApiHandler('http://localhost:8000/client/userlogin',optionsObj).then(resp =>{

        console.log(resp)
        if(resp.message === 'Invalid Email'){
          setError('Invalid Email')
        }else if(resp.message === 'Invalid password'){
          setError('Invalid password')
        }else{
          setError(null)
          setLoginSuccess(true);
          dispatch(clientReducerActions.setClientToken(resp.clientAuthToken))
          localStorage.setItem('clientAuthToken',resp.clientAuthToken)
          setTimeout(()=>{
            navigate('/client/home')
          },1500)
         
        }
       

    }).catch(err => {

      console.log(err)

    })
   
   
  };

  return (
    <Background>
    <Container className="mt-5 pt-5 d-flex justify-content-center">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
       
          <Card bg="dark" text="light" className="shadow-lg border-0">
            <Card.Header className="text-center">
              <h3 style={{ color: 'white', fontWeight: 'bold' }}>Login</h3>
            </Card.Header>
            <Card.Body>
          
              {loginSuccess && (
                <Alert variant="success" className="text-center">
                  Login successful! Welcome back to JollyDay 🎉
                </Alert>
              )}

               {error &&  <Alert variant="danger" className="text-center">
                 {error}
                </Alert>}
         
              <Form onSubmit={handleSubmit}>
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Log In
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="text-center">
              <p className="text-light">
                Don't have an account yet?{' '}
                <NavLink to="/client/signup" style={{ color: '#FFD700'}}>
                  Sign up here
                </NavLink>
              </p>
              <p className="text-light">
                Forgot your password?{' '}
                <NavLink to="/client/forgot-password" style={{ color: '#FFD700'}}>
                  Reset it here
                </NavLink>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    </Background>
  );
};

export default Login;
