import React from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logoULB from "../images/logo_ulb_blanc.png";

function Header(){

    return(

        <>
            <img src={logoULB} alt="Logo ULB" style={{ width: '190px', borderRadius: '5px', marginLeft: '10px' }} />

            <h1>Inventaire de la recherche</h1>


            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="Faculte">Home</Nav.Link>

                        <Nav.Link href="Faculte">Faculte</Nav.Link>
                        <Nav.Link href="Unite">Unite</Nav.Link>
                        <Nav.Link href="Projet">Projet</Nav.Link>
                        <Nav.Link href="Chercheur">Chercheur</Nav.Link>
                        <Nav.Link href="Frascati">Frascati</Nav.Link>
                        <Nav.Link href="Discipline">Discipline</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#"><span className="glyphicon glyphicon-log-out"></span> Log Out</Nav.Link>
                    </Nav>

                </Container>
            </Navbar>
        </>

    );

}

export default Header;