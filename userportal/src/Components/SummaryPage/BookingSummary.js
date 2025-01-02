import React from "react";
import { Card, Button, ListGroup, Row, Col, Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Background from "../UI/Background";
import { useDispatch, useSelector } from "react-redux";
import ApiHandler from "../../ApiHandler";
import { bookingOrderReducerActions } from "../../store/bookingorder";

const BookingSummary = () => {
  const dispatch = useDispatch();
  const bookingItems = useSelector((state) => state.bookings.bookings);
  const isLoading = useSelector((state) => state.propertyClient.isLoading);
  const filterByBookings = bookingItems.filter(
    (list) =>
      list.bookingStatus !== "Cancelled by client" &&
      list.bookingStatus !== "Rejected by admin" &&
      list.bookingStatus !== "Confirmed booking"
  );
  console.log(bookingItems);

  const handleRemove = (id) => {
    const updatedBooking = bookingItems.map((item) =>
      item._id === id ? { ...item, bookingStatus: "Cancelled by client" } : item
    );

    dispatch(bookingOrderReducerActions.setBookings(updatedBooking));

    ApiHandler("http://localhost:8000/client/clientremovedbooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function handlePayButton(id) {

    try {
      const getBookingItem = bookingItems.filter((item) => item._id === id);
      const totalCost = getBookingItem[0].totalCost;
  
      const initiateTrans = await ApiHandler("http://localhost:8000/client/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          userToken: localStorage.getItem("clientAuthToken"),
          amount: totalCost,
          bookingId: getBookingItem[0]._id,
        }),
      });
  
    
       console.log(initiateTrans)
 
      let razorUx = {
        key: initiateTrans.key_id,
        order_id: initiateTrans.order_details.id,
        handler: async function (response) {
          let upd_trans = await fetch("http://localhost:8000/client/transactionupdate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order_id: initiateTrans.order_details.id,
              payment_id: response.razorpay_payment_id,
              bookingId: getBookingItem[0]._id,
              clientToken: localStorage.getItem("clientAuthToken"),
            }),
          });
  
          let parsedUpdate = await upd_trans.json();
          console.log(parsedUpdate);
          alert("Booking confirmed");
        },
      };
  
      const rzp = new window.Razorpay(razorUx);
      rzp.open();
  
      rzp.on("payment failed", function (response) {
        console.log(response);
        alert("Something went wrong");
      });

    } catch (error) {
      console.error("Error during payment process: ", error);
      alert("An error occurred while processing the payment.");
    }
  }
  
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
    <Background>
      <Container className="mt-5 pb-5">
        <h2
          className="text-center text-light mb-5"
          style={{ fontSize: "3rem", fontWeight: "600" }}
        >
          Your Booking Summary
        </h2>

        {filterByBookings.length === 0 ? (
          <div className="text-center text-light">
            <h3>No properties added to your booking yet.</h3>
          </div>
        ) : (
          <Row>
            <Col sm={12}>
              <Card bg="dark" text="light" className="shadow-lg border-0">
                <Card.Body>
                  <ListGroup variant="flush">
                    {filterByBookings.map((item) => (
                      <ListGroup.Item
                        key={item._id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <Row className="w-100">
                          <Col xs={12} md={4}>
                            <img
                              src={item.propertyId.propertyImages[0]}
                              alt={item.propertyId.propertyName}
                              style={{ minHeight: "250px", maxHeight: "250px" }}
                              className="img-fluid rounded"
                            />
                          </Col>
                          <Col
                            xs={12}
                            md={8}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <h5>{item.propertyId.propertyName}</h5>
                              <p className="mb-1">
                                <strong>Location:</strong>{" "}
                                {item.propertyId.propertyAddress}
                              </p>
                              <p>
                                <strong>Price per Night:</strong> $
                                {item.propertyId.ppn}
                              </p>
                            </div>
                            <div>
                              <h6>Total Price: ${item.totalCost}</h6>
                              {item.bookingStatus === "Pending Confirmation" ? (
                                <Button variant="warning" disabled>
                                  Pending Admin Approval
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleRemove(item._id)}
                                  >
                                    Cancel Booking
                                  </Button>
                                  <Button
                                    variant="success"
                                    onClick={() => handlePayButton(item._id)}
                                  >
                                    Pay now to confirm
                                  </Button>{" "}
                                </>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Background>
  );
};

export default BookingSummary;
