import { Routes,Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import NavigationBar from "./Components/NavBar/NavigationBar";
import HomePage from "./Components/Home/HomePage";
import ExplorePage from "./Components/Explore/ExplorePage";
import BookingSummary from "./Components/SummaryPage/BookingSummary";
import MyBookingsPage from "./Components/MyBooking/MyBooking";
import AboutUsPage from "./Components/AboutUs/AboutUsPage";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Login/Login";



function App() {
  return (
    <div>
       <NavigationBar />
       <Routes>
        <Route path='/client/home' element={<HomePage /> } />
        <Route path='/client/explore' element={<ExplorePage /> } />
        <Route path='/client/booking-summary' element={<BookingSummary /> } />
        <Route path='/client/my-bookings' element={<MyBookingsPage /> } />
        <Route path='/client/aboutus' element={<AboutUsPage /> } />
        <Route path="/client/signup" element={<Signup /> } />
        <Route path='/client/login' element={<Login /> } />
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
