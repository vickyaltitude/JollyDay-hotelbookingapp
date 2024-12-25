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
        <Route path='/' element={<HomePage /> } />
        <Route path='/explore' element={<ExplorePage /> } />
        <Route path='/booking-summary' element={<BookingSummary /> } />
        <Route path='/my-bookings' element={<MyBookingsPage /> } />
        <Route path='/aboutus' element={<AboutUsPage /> } />
        <Route path="/signup" element={<Signup /> } />
        <Route path='/login' element={<Login /> } />
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
