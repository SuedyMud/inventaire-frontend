import React from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logoULB from "../images/logo_ulb_blanc.png";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
function Header(){

    return(

        <>

            <Navbar expand="lg" variant="bg-body-tertiary">
                <Container>

                    <Navbar.Brand href="#home">
                        <img src={logoULB} alt="Logo ULB" style={{ width: '190px', borderRadius: '5px', marginLeft: '10px' }} />
                    </Navbar.Brand>

                    <h1>Inventaire de la recherche</h1>
                   {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link href="Faculte">Faculte </Nav.Link>
                        <Nav.Link href="Unite">Unite </Nav.Link>
                        <Nav.Link href="Projet">Projet </Nav.Link>
                        <Nav.Link href="Chercheur">Chercheur </Nav.Link>
                        <Nav.Link href="Frascati">Frascati </Nav.Link>
                        <Nav.Link href="Discipline">Discipline </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    {/*<Nav>
                        <Nav.Link href="#"><span className="glyphicon glyphicon-log-out"></span> Log Out</Nav.Link>
                    </Nav>*/}

                </Container>
            </Navbar>
        </>

    );

}

export default Header;