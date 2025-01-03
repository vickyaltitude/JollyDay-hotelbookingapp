import { Route, Routes } from "react-router-dom";
import MyNavbar from "./Components/Navbars/NavBar";
import HomePage from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import {Container,Row,Col,Card} from 'react-bootstrap'
import CreateListing from "./Components/Listings/CreateListing";
import ViewListings from "./Components/Listings/ViewListings";
import ManageBookings from "./Components/ManageBookings/ManageBookings";
import AdminProfile from "./Components/Profile/AdminProfile";
import BookingHistory from "./Components/History/BookingHistory";
import LoginPage from "./Components/Authentication/Login";
import JoinUsPage from "./Components/Authentication/JoinUsPage";
import MissingPage from "./Components/MissingPage/MissingPage";
import SignupPage from "./Components/Authentication/SignupPage";
import { adminReducerActions } from "./store/adminReducer";
import { propertyReducerActions } from "./store/propertyReducer";
import { bookingsReducerActions } from "./store/bookingReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PropertyDetails from "./Components/Listings/PropertyDetails";
import ApiHandler from "./ApiHandler";
import {useSelector} from 'react-redux'
import Background from "./Components/UI/Background";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.property.propertyLoading)


 useEffect(()=>{
   
  dispatch(adminReducerActions.setAdminAuthToken(localStorage.getItem('adminAuthToken')))
  dispatch(adminReducerActions.setAdminDetails(JSON.parse(localStorage.getItem('adminDetails'))))
  

 },[dispatch])

 useEffect(()=>{

  const optionsObj = {
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('adminAuthToken')
    }
  }

   ApiHandler('http://localhost:8000/admin/getbookings',optionsObj).then(resp =>{
    
    console.log(resp)
    dispatch(bookingsReducerActions.setBookings(resp.data))

   }).catch(err =>{

       console.log(err)

   })
    
    ApiHandler('http://localhost:8000/admin/getproperties',optionsObj).then(resp=>{
      
      console.log(resp.properties)
      dispatch(propertyReducerActions.setProperties(resp.properties))
      dispatch(propertyReducerActions.setPropertyLoad())

    }).catch(err =>{

        console.log(err)

    })
   

 },[])


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
    <div>
       <MyNavbar />
     
       <Routes>
        <Route path='/backend/home' element={  <HomePage />} />
        <Route path='/backend/create-listing' element={<CreateListing /> } />
        <Route path='/backend/view-listings' element={<ViewListings /> } />
        <Route path='/backend/manage-bookings' element={<ManageBookings /> } />
        <Route path='/backend/profile' element={<AdminProfile /> } />
        <Route path='/backend/booking-history' element={<BookingHistory /> } />
        <Route path='/backend/login' element={<LoginPage /> } />
        <Route path='/backend/joinus' element={<JoinUsPage /> } />
        <Route path='/backend/signup' element={<SignupPage /> } />
        <Route path='/backend/propertydetails/:id' element={<PropertyDetails /> }/>
        <Route path="*" element={<MissingPage /> }/>
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
