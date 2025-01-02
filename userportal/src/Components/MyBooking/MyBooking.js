import React from "react";
import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";
import Background from "../UI/Background";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyBookingsPage = () => {
  const bookingItems = useSelector((state) => state.bookings.bookings);
  const isLoading = useSelector((state) => state.propertyClient.isLoading);
  const filterByBookings = bookingItems.filter(
    (list) =>
      list.bookingStatus === "Cancelled by client" ||
      list.bookingStatus === "Confirmed booking" ||
      list.bookingStatus === "Rejected by admin" ||
      list.bookingStatus === "Payment failed"
  );

  console.log(filterByBookings);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Cancelled by client":
        return <Badge bg="danger">Cancelled by you</Badge>;
      case "Confirmed booking":
        return <Badge bg="success">Booking confirmed</Badge>;
      case "Payment failed":
        return <Badge bg="warning">Payment Failed</Badge>;
      case "Rejected by admin":
        return <Badge bg="danger">Booking rejected by admin</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

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
      <Container className="mt-5">
        <h2
          className="text-center text-light mb-5"
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            letterSpacing: "1px",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          My Bookings
        </h2>

        {filterByBookings.length === 0 ? (
          <div className="text-center text-light">
            <h3
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                color: "#FFD700",
              }}
            >
              You have no booking history.
            </h3>
          </div>
        ) : (
          <Row>
            {filterByBookings.map((booking) => (
              <Col key={booking._id} sm={12} md={6} lg={4} className="mb-4">
                <Card
                  bg="dark"
                  text="light"
                  className="shadow-lg border-0 h-100 rounded-lg"
                >
            
                  <Card.Img
                    variant="top"
                    src={
                      booking.propertyId?.propertyImages[0] ||
                      "default-image.jpg"
                    }
                    alt={booking.propertyId?.propertyName || "Property"}
                    style={{
                      borderRadius: "10px",
                      height: "200px",
                      objectFit: "cover",
                      filter: "brightness(0.7)",
                    }}
                  />
                  <Card.Body>
                
                    <Card.Title
                      style={{
                        color: "#FFD700",
                        fontWeight: "bold",
                        fontSize: "1.6rem",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {booking.propertyId?.propertyName}
                    </Card.Title>

                    <Card.Text
                      style={{
                        color: "#E0E0E0",
                        fontSize: "1rem",
                        lineHeight: "1.6",
                      }}
                    >
                      <div style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#FFD700" }}>
                          Total members:
                        </strong>{" "}
                        {booking.numberOfGuests}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#FFD700" }}>
                          Booking Name:
                        </strong>{" "}
                        {booking.userId?.userName || "N/A"}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#FFD700" }}>Location:</strong>{" "}
                        {booking.propertyId?.propertyAddress || "Not Available"}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#FFD700" }}>Dates:</strong>{" "}
                        From{" "}
                        {`${new Date(
                          booking.startingDate
                        ).toLocaleDateString()}`}{" "}
                        to{" "}
                        {`${new Date(booking.endingDate).toLocaleDateString()}`}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong style={{ color: "#FFD700" }}>Status:</strong>{" "}
                        {getStatusBadge(booking.bookingStatus)}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Background>
  );
};

export default MyBookingsPage;
