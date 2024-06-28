import { Container, Navbar, Button, Nav, NavDropdown } from 'react-bootstrap';
import React from 'react';
import { useTheme } from './themeContext';
import { useNavigate } from 'react-router-dom';

function NavHeader (props) {

    const navigate = useNavigate();

    const {theme, toggleTheme} = useTheme();

  return(
        <>
          {theme === 'light' && (
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
              <Container>
                <Navbar.Brand className='title-hover' onClick={() => navigate('/')}>What do you Meme?</Navbar.Brand>
                  <Nav className="me-auto">
                    {props.login && <>
                      <Navbar.Text>Signed in as: {props.username}</Navbar.Text>
                    </>}
                  {!props.login && <>
                      <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                    </>}
                  </Nav>
                  <Nav>
                  {props.login && (
                      <>
                        <Nav.Link onClick={() => navigate('/profile')}>Profile</Nav.Link>
                        <Nav.Link onClick={props.handleLogout}>Logout</Nav.Link>
                      </>
                    )}
                      <SwitchThemeButton onClick={()=>toggleTheme}/>
                  </Nav>
              </Container>
            </Navbar>
          )}
          {theme === "dark" && (
            <Navbar collapseOnSelect expand="lg" bg='dark' data-bs-theme='dark'>
              <Container>
                <Navbar.Brand className='title-hover' onClick={() => navigate('/')}>What do you Meme?</Navbar.Brand>
                <Nav className="me-auto">
                    {props.login && <>
                      <Navbar.Text>Signed in as: {props.username}</Navbar.Text>
                    </>}
                  {!props.login && <>
                      <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                    </>}
                  </Nav>
                  <Nav>
                  {props.login && (
                      <>
                        <Nav.Link onClick={() => navigate('/profile')}>Profile</Nav.Link>
                        <Nav.Link onClick={props.handleLogout}>Logout</Nav.Link>
                      </>
                    )}
                      <SwitchThemeButton onClick={()=>toggleTheme}/>
                  </Nav>
              </Container>
            </Navbar>
          )}
        </>
      );
}

function SwitchThemeButton(props){
    const {theme, toggleTheme} = useTheme();

    return(
        <>
            {theme === 'light' && <Button className='btn button-light rounded-circle button-fixed' variant='dark' style={{fontSize: '15'}} onClick={toggleTheme}> <i className="bi bi-moon-fill icon-fixed" ></i></Button>}
            {theme === 'dark' && <Button className='btn button-dark rounded-circle button-fixed' variant='light' onClick={toggleTheme}><i className="bi bi-sun-fill icon-fixed" ></i></Button>}
        </>
    );
}

export default NavHeader;