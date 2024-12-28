import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "./Components/Footer/Footer";
import NavigationBar from "./Components/NavBar/NavigationBar";
import HomePage from "./Components/Home/HomePage";
import ExplorePage from "./Components/Explore/ExplorePage";
import BookingSummary from "./Components/SummaryPage/BookingSummary";
import MyBookingsPage from "./Components/MyBooking/MyBooking";
import AboutUsPage from "./Components/AboutUs/AboutUsPage";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Login/Login";
import { propertyClientReducerActions } from "./store/propertyReducer";
import { bookingOrderReducerActions } from "./store/bookingorder";
import { clientReducerActions } from "./store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import ApiHandler from "./ApiHandler";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Background from "./Components/UI/Background";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.propertyClient.isLoading);

  useEffect(() => {
    dispatch(
      clientReducerActions.setClientToken(
        localStorage.getItem("clientAuthToken")
      )
    );
  }, [dispatch]);

  useEffect(() => {
    ApiHandler("http://localhost:8000/client/getbookingorders")
      .then((resp) => {
        console.log(resp);

        dispatch(bookingOrderReducerActions.setBookings(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });

    ApiHandler("http://localhost:8000/client/allproperty")
      .then((resp) => {
        console.log(resp);
        dispatch(propertyClientReducerActions.setProperties(resp.data));
        dispatch(
          propertyClientReducerActions.setSortProperty(
            localStorage.getItem("sortProperty")
          )
        );
        dispatch(propertyClientReducerActions.setIsLoading());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <Background>
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={6} style={{ paddingTop: "50px" }}>
              <Card
                style={{
                  backgroundColor: "#212529",
                  color: "white",
                  borderRadius: "10px",
                  padding: "30px",
                }}
              >
                <Card.Body>
                  <Skeleton
                    height={30}
                    width="70%"
                    style={{ marginBottom: "20px" }}
                  />
                  <Skeleton
                    height={50}
                    width="100%"
                    count={3}
                    style={{ marginBottom: "20px" }}
                  />
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
      <NavigationBar />
      <Routes>
        <Route path="/client/home" element={<HomePage />} />
        <Route path="/client/explore" element={<ExplorePage />} />
        <Route path="/client/booking-summary" element={<BookingSummary />} />
        <Route path="/client/my-bookings" element={<MyBookingsPage />} />
        <Route path="/client/aboutus" element={<AboutUsPage />} />
        <Route path="/client/signup" element={<Signup />} />
        <Route path="/client/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
