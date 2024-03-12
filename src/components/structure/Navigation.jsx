import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";


function Navigation() {

    return (
        <>

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="Faculte">Faculte / Département</Nav.Link>
                            <Nav.Link href="Unite">Répertoire des Unités</Nav.Link>
                            <Nav.Link href="Projet">Répertoire des Projets</Nav.Link>
                            <Nav.Link href="Chercheur">Répertoire des Chercheurs</Nav.Link>
                            <Nav.Link href="Frascati">Classement par Frascati</Nav.Link>
                            <Nav.Link href="Discipline"> Discipline CREF</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;
