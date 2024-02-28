import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import logoULB from "../images/logo_ulb_blanc.png";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import LogoutButton from "./LogoutButton.jsx";
import LoginButton from "./LoginButton.jsx";
function Header(){

    return(

        <>
            <div>
                <h1 className="m-0">Inventaire de la recherche</h1>
            </div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">

                        <img src={logoULB} alt="Logo ULB" style={{ width: '190px', borderRadius: '5px', marginRight: '10px' }} />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="Faculte">Faculte</Nav.Link>
                            <Nav.Link href="Unite">Unite</Nav.Link>
                            <Nav.Link href="Projet">Projet</Nav.Link>
                            <Nav.Link href="Chercheur">Chercheur</Nav.Link>
                            <Nav.Link href="Frascati">Frascati</Nav.Link>
                            <Nav.Link href="Discipline">Discipline</Nav.Link>

                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav>
                            <Nav.Link href="#"><Button variant="primary">Sign Up</Button></Nav.Link>
                            <Nav.Link href="#"><Button variant="secondary">Login</Button></Nav.Link>

                            {/*<Nav.Link href="#">
                                <LoginButton/>
                            </Nav.Link>*/}
                            <Nav.Link href="#">

                                <LogoutButton/>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );

}

export default Header;