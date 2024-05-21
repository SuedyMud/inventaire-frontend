import {Col, Container, Row} from "react-bootstrap";
import faculteDroit from "../../images/facule_droit.jpg";
import React from "react";

export const Home = () => {

    return (


        <Container fluid>
            <Row>
                <Col sm={2} className="sidenav">
                   {/* <p><a href="#">Link</a></p>
                    <p><a href="#">Link</a></p>
                    <p><a href="#">Link</a></p>*/}
                </Col>
                <Col sm={8} className="text-left">



                        <div className="page">

                            <Row>
                                <Col>
                                    <h1 >Bienvenue</h1>

                                    <p>L'Université libre de Bruxelles (ULB) est déterminée à promouvoir l'excellence de sa recherche et à en assurer une visibilité tant nationale qu'internationale. Notre institution accorde une importance primordiale à la liberté de recherche et à son implication à l'échelle mondiale.</p>
                                    <p>En tant qu'université de renom, l'ULB s'engage à maintenir des standards élevés dans tous ses domaines de recherche. Nous croyons fermement que l'excellence scientifique est le pilier fondamental qui soutient notre réputation académique et notre capacité à innover. Pour atteindre cet objectif, l'université investit continuellement dans des infrastructures de recherche de pointe, des laboratoires bien équipés et des bibliothèques riches en ressources, offrant ainsi un environnement propice à la réalisation de travaux de recherche de haut niveau.</p>

                                </Col>
                                <Col>
                                    <div className="logo2">
                                        <img
                                            src={faculteDroit}
                                            alt="faculteDroit"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <hr />

                        <h2>À propos de l'Inventaire de la Recherche :</h2>
                        <p>L'Inventaire de la Recherche de l'ULB est un outil essentiel pour découvrir et explorer les multiples facettes de nos activités de recherche. Il vise à offrir une présentation claire et complète des entités de recherche qui font la richesse de notre université.</p>
                        <h2>Objectifs et perspectives :</h2>
                        <ul>
                            <li><strong>Visibilité accrue :</strong> L'Inventaire de la Recherche permet de mettre en lumière les réalisations et les avancées de nos chercheurs dans divers domaines.</li>
                            <li><strong>Facilité d'accès :</strong> Nous nous efforçons de rendre la recherche à l'ULB accessible à tous, qu'il s'agisse de la communauté universitaire, des partenaires externes, des décideurs ou du grand public.</li>
                            <li><strong>Mise à jour régulière :</strong> Nous nous engageons à maintenir l'Inventaire constamment actualisé, avec des informations pertinentes et à jour sur nos unités de recherche, nos collaborations, nos publications et nos projets.</li>
                        </ul>
                        <h2>Exploration de la recherche :</h2>
                        <ul>
                            <li><strong>Unités de recherche :</strong> Découvrez nos différentes unités de recherche, organisées par faculté, domaine de recherche et structure interne.</li>
                            <li><strong>Unités transdisciplinaires :</strong> Explorez nos entités de recherche interdisciplinaires qui regroupent des chercheurs de différentes unités pour aborder des défis complexes.</li>
                            <li><strong>Projets et collaborations :</strong> Consultez nos projets en cours, nos collaborations nationales et internationales, ainsi que nos publications et nos thèses.</li>
                        </ul>
                        <hr />
                        <h2>Nous contacter :</h2>
                        <p>Pour toute question ou information supplémentaire sur notre recherche à l'ULB, n'hésitez pas à nous contacter. Nous sommes là pour vous aider et pour vous fournir les informations dont vous avez besoin. <br/>
                            <a href="mailto:suedymud@hotmail.com">suedymud@hotmail.com</a>
                        </p>


                    </div>
                </Col>
                <Col sm={2} className="sidenav">
                    {/*<div className="well">
                        <p>ADS</p>
                    </div>
                    <div className="well">
                        <p>ADS</p>
                    </div>*/}
                </Col>
            </Row>
        </Container>


    )
}