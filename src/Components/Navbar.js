import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

// Navbar for navigation
function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Food Pulse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Recipes">Recipes</Nav.Link>
            <Nav.Link href="/Categories">Category</Nav.Link>
            <Nav.Link href="/Add/User">User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
