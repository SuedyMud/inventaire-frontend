import React from 'react';
import {Navbar, Nav, Container} from "react-bootstrap";
import logoULB from "../images/logo_ulb_blanc.png";
import logoULBHeader from "../images/imageHeaderInventaire.jpg";
import {Link} from "react-router-dom";

function Header(){

    return(

        <>
        <Container className="w-75">
            <div className="flex d-inline-flex">


                <img src={logoULB} alt="Logo ULB" className="float-start w-25" style={{ width: '190px', borderRadius: '5px', marginRight: '10px' }} />
                <div className="w-100 justify-content-center my-auto">
                <h1 className="m-0 text-center">Inventaire de la recherche</h1>


            </div>
            </div>



            <Navbar expand="lg" className="ustify-content-center">


                    {/*<Navbar.Brand href="Faculte">
                        <img src={logoULB} alt="Logo ULB" style={{ width: '190px', borderRadius: '5px', marginRight: '10px' }} />
                    </Navbar.Brand>*/}


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="Faculte">Faculte/Département</Nav.Link>
                            <Nav.Link href="Unite">Répertoire des Unités</Nav.Link>
                            <Nav.Link href="Projet">Répertoire des Projets</Nav.Link>
                            <Nav.Link href="Chercheur">Répertoire des Chercheurs</Nav.Link>
                            <Nav.Link href="Frascati">Classement par Frascati</Nav.Link>
                            <Nav.Link href="Discipline">Discipline CREF</Nav.Link>

                        </Nav>

                        <Nav>
                            {/*<Nav.Link href="#"><Button variant="primary">Sign Up</Button></Nav.Link>
                            <Nav.Link href="#"><Button variant="secondary">Login</Button></Nav.Link>*/}

                            {/*<Nav.Link href="#">
                                <LoginButton/>
                            </Nav.Link>*/}
                           {/* <Nav.Link href="#">

                                <LogoutButton/>
                            </Nav.Link>*/}
                        </Nav>
                    </Navbar.Collapse>

            </Navbar> </Container>
        </>

    );

}

export default Header;