import { Route, Routes } from "react-router-dom";
import MyNavbar from "./Components/Navbars/NavBar";
import HomePage from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
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
import { useDispatch } from "react-redux";
import { useEffect } from "react";


function App() {

  const dispatch = useDispatch();


 useEffect(()=>{
   
  dispatch(adminReducerActions.setAdminAuthToken(localStorage.getItem('adminAuthToken')))
  
  
 },[dispatch])


  return (
    <div>
       <MyNavbar />
     
       <Routes>
        <Route path='/admin/home' element={  <HomePage />} />
        <Route path='/admin/create-listing' element={<CreateListing /> } />
        <Route path='/admin/view-listings' element={<ViewListings /> } />
        <Route path='/admin/manage-bookings' element={<ManageBookings /> } />
        <Route path='/admin/profile' element={<AdminProfile /> } />
        <Route path='/admin/booking-history' element={<BookingHistory /> } />
        <Route path='/admin/login' element={<LoginPage /> } />
        <Route path='/admin/joinus' element={<JoinUsPage /> } />
        <Route path='/admin/signup' element={<SignupPage /> } />
        <Route path="*" element={<MissingPage /> }/>
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
