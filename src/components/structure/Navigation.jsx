import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../buttons/LogoutButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../buttons/LoginButton.jsx";
import PermissionGuard from "../../utils/PermissionGuard.jsx";

function Navigation() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Navbar expand="lg" bg="light">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/faculte">Faculte / Département</Nav.Link>
                                <PermissionGuard permission={'read:all-information'}>
                                    <Nav.Link as={Link} to="/unite">Répertoire des Unités</Nav.Link>
                                    <Nav.Link as={Link} to="/projet">Répertoire des Projets</Nav.Link>
                                    <Nav.Link as={Link} to="/chercheur">Répertoire des Chercheurs</Nav.Link>
                                    <Nav.Link as={Link} to="/frascati">Classement par Frascati</Nav.Link>
                                    <Nav.Link as={Link} to="/discipline">Discipline CREF</Nav.Link>
                                </PermissionGuard>
                            </>
                        ) : null}
                    </Nav>

                    {isAuthenticated ? (
                        <ul className="nav navbar-nav-right">
                            <li className="nav-item me-2">
                                <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/profil`)}>
                                    {user.name}
                                </Button>
                            </li>
                            <li className="nav-item">
                                <LogoutButton />
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
