import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";


function Navigation() {

    return (
        <Navbar expand="lg" bg="light">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/faculte">Faculte / Département</Nav.Link>
                        <Nav.Link as={Link} to="/unite">Répertoire des Unités</Nav.Link>
                        <Nav.Link as={Link} to="/projet">Répertoire des Projets</Nav.Link>
                        <Nav.Link as={Link} to="/chercheur">Répertoire des Chercheurs</Nav.Link>
                        <Nav.Link as={Link} to="/frascati">Classement par Frascati</Nav.Link>
                        <Nav.Link as={Link} to="/discipline"> Discipline CREF</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default Navigation;
