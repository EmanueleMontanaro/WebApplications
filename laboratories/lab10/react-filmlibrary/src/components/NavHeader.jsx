import { Container, Navbar, Form, Row, Col, Button } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';

function NavHeader () {
  return(
    <Navbar bg='light' data-bs-theme='light'>
      <Container fluid>
        <Navbar.Brand>Film Library</Navbar.Brand>
        <SearchForm/>
        <ProfileButton/>
      </Container>
      
    </Navbar>
  );
}

function SearchForm () {
  return(
    <Form>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="warning">Submit</Button>
          </Col>
        </Row>
      </Form>
  );
}

function ProfileButton () {

    const buttonStyle = {
      width: '45px', // Set fixed width for circular shape
      height: '45px', // Set fixed height for circular shape
      borderRadius: '50%', // Make the button circular
      backgroundColor: 'warning', // Set custom background color
      borderColor: 'warning', // Set border color to match background color
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0, // Remove any padding to maintain circular shape
    };
  
    const iconStyle = {
      width: '24px', // Set fixed width for the icon
      height: '24px', // Set fixed height for the icon
      color: 'black', // Set icon color
    };

  return(
    <Button variant="warning" style={buttonStyle}>
      <BsPersonCircle style={iconStyle}/> 
    </Button>
  );
}

export default NavHeader;