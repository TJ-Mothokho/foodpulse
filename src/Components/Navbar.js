import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, Button } from 'react-bootstrap';
import { UsernameContext } from '../UserContext/UsernameContext';

// Navbar for navigation
function AppNavbar() {
  const {username} = useContext(UsernameContext);

  return (
    
    
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Food Pulse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0" style={{maxHeight:'100px'}} navbarScroll>
            <Nav.Link href="/Categories">Category</Nav.Link>

            <NavDropdown title='Recipes' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='/'>Recipes</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href='/Recipe/Add'>New Recipe</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title='Users' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='/Users'>Users</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href='/Register'>Register</NavDropdown.Item>
            </NavDropdown>

          </Nav>
          <Form className='d-flex mx-5'>
            <Form.Control type='search' placeholder='Search' className='me-2' aria-label='Search' />
            <Button variant='outline-light'>Search</Button>
          </Form>

          <Navbar.Text className='mx-5'>
            Signed in as: <a href='/profile'>{username}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
