import React from 'react';
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';
import Background from '../UI/Background';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = () => {

  const clientToken = useSelector(state => state.client.clientToken)
  return (
    <Background>
     
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?cs=srgb&dl=pexels-pixabay-221457.jpg&fm=jpg"
            alt="Welcome to JollyDay"
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
          <h3
                    style={{
                        fontSize: '2.5rem', // Make the text larger
                        fontWeight: 'bold', // Make the heading bold for readability
                        color: 'white', // Ensure the text is white for contrast
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add a shadow for better readability
                        marginBottom: '0.5rem',
                    }}
                    >
                   Welcome to JollyDay
                    </h3>
                    <p
                    style={{
                        fontSize: '1.2rem', // Make the paragraph text larger
                        color: 'white', // Ensure the text is white
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)', // Add a shadow for better readability
                        maxWidth: '600px', // Optional: Limit the text width for better readability
                        margin: '0 auto', // Center-align text
                    }}
                    >
                    Discover luxurious stays at hotels, apartments, boathouses, and villas.
                    </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
                    <img
            className="d-block w-100"
            src="https://c1.wallpaperflare.com/preview/293/808/864/lone-house-house-on-waters-kerala-boat-house.jpg"
            style={{ height: '500px', objectFit: 'cover' }}
             alt="Book your dream stay"
            />

          <Carousel.Caption>
                            <h3
                    style={{
                        fontSize: '2.5rem', // Make the text larger
                        fontWeight: 'bold', // Make the heading bold for readability
                        color: 'white', // Ensure the text is white for contrast
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add a shadow for better readability
                        marginBottom: '0.5rem',
                    }}
                    >
                    Book Your Dream Stay
                    </h3>
                    <p
                    style={{
                        fontSize: '1.2rem', // Make the paragraph text larger
                        color: 'white', // Ensure the text is white
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)', // Add a shadow for better readability
                        maxWidth: '600px', // Optional: Limit the text width for better readability
                        margin: '0 auto', // Center-align text
                    }}
                    >
                    Find your perfect getaway with our easy-to-use booking platform.
                    </p>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://static.vecteezy.com/system/resources/previews/037/980/369/non_2x/ai-generated-luxury-golden-house-exterior-in-the-desert-serene-oceanic-vista-ai-generated-photo.jpg"
            alt="Exclusive Deals"
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
          <h3
                    style={{
                        fontSize: '2.5rem', // Make the text larger
                        fontWeight: 'bold', // Make the heading bold for readability
                        color: 'white', // Ensure the text is white for contrast
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add a shadow for better readability
                        marginBottom: '0.5rem',
                    }}
                    >
                    Exclusive Deals
                    </h3>
                    <p
                    style={{
                        fontSize: '1.2rem', // Make the paragraph text larger
                        color: 'white', // Ensure the text is white
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)', // Add a shadow for better readability
                        maxWidth: '600px', // Optional: Limit the text width for better readability
                        margin: '0 auto', // Center-align text
                    }}
                    >
                    Enjoy the best prices and special offers on premium stays.
                    </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


      {/* What We Offer Section */}
      <Container className="mt-5">
        <h2 className="text-center text-light">What We Offer</h2>
        <Row className="mt-4">
          <Col md={3}>
          <Card bg="dark" text="light" className="mb-3" style={{ width: '18rem', height: '25rem' }}>
                <Card.Img
                    variant="top"
                    src="https://wallpaperswide.com/download/luxury_hotel-wallpaper-1920x1440.jpg"
                    style={{ height: '18rem', objectFit: 'cover' }}
                />
                <Card.Body>
                    <Card.Title>Hotels</Card.Title>
                    <Card.Text>
                    Stay in luxury at top-rated hotels worldwide.
                    </Card.Text>
                </Card.Body>
         </Card>

          </Col>
          <Col md={3}>
           
          <Card bg="dark" text="light" className="mb-3" style={{ width: '18rem', height: '25rem' }}>
                <Card.Img
                    variant="top"
                    src="https://img.freepik.com/premium-photo/high-buildings-with-cloudy-blue-sky_341545-529.jpg"
                    style={{ height: '18rem', objectFit: 'cover' }}
                />
                <Card.Body>
                    <Card.Title>Apartments</Card.Title>
                    <Card.Text>
                    Experience comfort in fully-equipped apartments
                    </Card.Text>
                </Card.Body>
         </Card>
           
          </Col>
          <Col md={3}>
          <Card bg="dark" text="light" className="mb-3" style={{ width: '18rem', height: '25rem' }}>
                <Card.Img
                    variant="top"
                    src="https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2Vib2F0fGVufDB8fDB8fHww"
                    style={{ height: '18rem', objectFit: 'cover' }}
                />
                <Card.Body>
                    <Card.Title>Boathouses</Card.Title>
                    <Card.Text>
                    Relax on the water with unique boathouse stays
                    </Card.Text>
                </Card.Body>
         </Card>

          </Col>
          <Col md={3}>
          <Card bg="dark" text="light" className="mb-3" style={{ width: '18rem', height: '25rem' }}>
                <Card.Img
                    variant="top"
                    src="https://freedesignfile.com/upload/2016/10/Luxurious-villa-exterior-and-wonderful-magic-sky-03-HD-picture.jpg"
                    style={{ height: '18rem', objectFit: 'cover' }}
                />
                <Card.Body>
                    <Card.Title>Villas</Card.Title>
                    <Card.Text>
                    Enjoy privacy and luxury at stunning villas
                    </Card.Text>
                </Card.Body>
         </Card>

            
          </Col>
        </Row>
      </Container>

      {/* Call-to-Action Section */}
      <Container className="mt-5 text-center">
        <h2 className="text-light">Ready to Book?</h2>
        {!clientToken && <> <p className="text-light">
          Sign up today and discover the perfect stay for your next vacation.
        </p>
        <Button as={NavLink} variant="primary" to="/client/signup">Get Started</Button></>}
        {clientToken &&  <> <p className="text-light">
         Visit our Explore page to book your stay now
        </p>
        <Button as={NavLink} variant="primary" to="/client/explore">Get Started</Button></>}
      </Container>
    </Background>
  );
};

export default HomePage;
