import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Background from '../UI/Background'; 
import ApiHandler from '../../ApiHandler';
import { useNavigate } from 'react-router-dom';
import { adminReducerActions } from '../../store/adminReducer';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const [platformId, setPlatformId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {

    e.preventDefault();
    if(password.length < 6){
      setErrorMessage('Password length should not be less than 6')
    }else{
      setIsLoading(true)
       setErrorMessage('')
       const sendDataObj = {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({platformId,password})
       }
       ApiHandler('http://localhost:8000/admin/checklogin',sendDataObj).then(resp =>{
         
        setIsLoading(false)
          if(resp.msg === "User login successfull"){
        
            setErrorMessage('')
            localStorage.setItem('adminAuthToken',resp.adminAuthToken)
            localStorage.setItem('adminDetails',JSON.stringify(resp.userDetails))
            dispatch(adminReducerActions.setAdminAuthToken(resp.adminAuthToken))
            dispatch(adminReducerActions.setAdminDetails(resp.userDetails))
            navigate('/admin/home')

          }else{

            console.log(resp)
            setErrorMessage(resp.message)

          }

       }).catch(err =>{

           console.log(err)

       })
    }
     
  };

  return (
    <Background>
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <Card className="shadow-lg" style={{ borderRadius: '10px', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
              <Card.Body>
                <h3 className="text-center text-white mb-4">Login</h3>
                
                
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                
               
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="platformId">
                    <Form.Label className="text-white">Platform ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your platform ID"
                      value={platformId}
                      onChange={(e) => setPlatformId(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mt-3">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                 
                  <div className="d-flex justify-content-between">
                    <Button variant="link" className="text-white p-0">
                      Forgot Password?
                    </Button>
                    <Button variant="primary" type="submit" block className="mt-3">

                      {isLoading && 'Logging in ...'}
                      {!isLoading && 'Login'}
                     
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Background>
  );
};

export default LoginPage;
