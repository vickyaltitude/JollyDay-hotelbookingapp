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



function App() {
  return (
    <div>
       <MyNavbar />
     
       <Routes>
        <Route path='/' element={  <HomePage />} />
        <Route path='/create-listing' element={<CreateListing /> } />
        <Route path='/view-listings' element={<ViewListings /> } />
        <Route path='/manage-bookings' element={<ManageBookings /> } />
        <Route path='/profile' element={<AdminProfile /> } />
        <Route path='/booking-history' element={<BookingHistory /> } />
        <Route path='/login' element={<LoginPage /> } />
        <Route path='/joinus' element={<JoinUsPage /> } />
        <Route path="*" element={<MissingPage /> }/>
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
