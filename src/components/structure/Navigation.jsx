import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "../buttons/LogoutButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../buttons/LoginButton.jsx";
import PermissionGuard from "../../utils/PermissionGuard.jsx";

function Navigation() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Navbar expand="lg" bg="light">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />


                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isAuthenticated ? (
                            <>

                                <Nav.Link as={Link} to="/faculte">Faculte / Département</Nav.Link>
                                <Nav.Link as={Link} to="/unite">Répertoire des Unités</Nav.Link>
                                <Nav.Link as={Link} to="/projet">Répertoire des Projets</Nav.Link>
                                <Nav.Link as={Link} to="/chercheur">Répertoire des Chercheurs</Nav.Link>
                                <Nav.Link as={Link} to="/frascati">Classement par Frascati</Nav.Link>
                                <Nav.Link as={Link} to="/discipline">Discipline CREF</Nav.Link>
                            </>
                        ) : null}
                    </Nav>

                    {isAuthenticated ? (
                        <ul className="nav navbar-nav-right">
                            <li>
                                <p>{user.name}</p>
                            </li>

                            <li>
                                <a href="#"><span className="glyphicon glyphicon-log-out"></span> <LogoutButton /></a>
                            </li>
                        </ul>
                    ) : (
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="#"><span className="glyphicon glyphicon-log-in"></span> <LoginButton /></a>
                            </li>
                        </ul>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
