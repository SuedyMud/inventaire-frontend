import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import React,  {useEffect, useState} from "react";
import {ListGroup, Row, Col, Button, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';


function Chercheur() {
    const {getAccessTokenSilently} = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState('A');


    useEffect(() => {
        const fetchData = async (letter) => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("/api/zchercheur/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        lettre: letter,
                        page: 0, // Page numéro 0 (première page)
                        size: 10000, // Nombre d'éléments par page
                    },
                });


                if (response.status === 200) {
                    const sortedData = response.data.content.sort((a, b) => a.nom.localeCompare(b.nom));
                    setData(sortedData);
                    /*console.log("Données stockées dans l'état:", sortedData);*/

                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData(currentPage);
        /* console.log('used for chercheur')*/
    }, [currentPage, getAccessTokenSilently]);

    const handlePaginationClick = (letter) => {
        setCurrentPage(letter);
    };


    /*const handleDeleteClick = async (idche) => {
        const accessToken = await getAccessTokenSilently();

        try {
            const response = await axios.delete(`/api/zchercheur/${idche}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 204) {
                // Actualiser les données après la suppression
                fetchData(currentPage);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du chercheur : ", error);
        }
    };*/

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const paginationItems = alphabet.split('').map((letter, index) => {
        // Vérifier s'il y a des éléments commençant par cette lettre
        const letterIsActive = data.some(item => item.nom.charAt(0).toUpperCase() === letter);
        return (
            <Pagination.Item
                key={index}
                active={letter === currentPage}
                disabled={!letterIsActive}
                onClick={() => handlePaginationClick(letter)}
            >
                {letter}
            </Pagination.Item>
        );
    });

    // Filtrer les données pour n'afficher que les éléments commençant par la lettre de la page actuelle
    const filteredData = data.filter(item => item.nom.charAt(0).toUpperCase() === currentPage);


    // Diviser les données en groupes de trois
    const groupedData = [];
    for (let i = 0; i < filteredData.length; i += 3) {
        groupedData.push(filteredData.slice(i, i + 3));
    }
    /* console.log("Données transmises aux liens:", groupedData);*/ // Log des données transmises aux liens


    return (
        <>
            <h2>Répertoire des Chercheurs</h2>
            <p>Classement par ordre alphabétique</p>
            <div>
                <Pagination>{paginationItems}</Pagination>
                {groupedData.map((group, index) => (
                    <Row key={index}>
                        {group.map((item) => (
                            <Col key={item.idche} sm={4}>
                                <ListGroup as="ul">
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-center my-1"
                                    >
                                        {/* Passer les props dans la balise Link */}
                                        <Link to={{
                                            pathname: `/chercheurDetail/${item.idche}`,
                                            state: {
                                                // Ajoutez ici les props adaptées
                                                nom: item.nom,
                                                prenom: item.prenom,
                                                telephone: item.telephone,
                                                cpi: item.cpi,
                                                site: item.site,
                                                email: item.email,
                                                campus: item.campus
                                            }


                                        }} style={{textDecoration: 'none'}}

                                        >
                                            <p>{item.nom} {item.prenom}</p>


                                        </Link>

                                        {/*<Link to={`/chercheurUpdate/${item.idche}`}>
                                            <Button variant="primary">
                                                Modifier
                                            </Button>
                                        </Link>


                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteClick(item.idche)}
                                            className="ml-2"
                                        >
                                            Supprimer
                                        </Button>*/}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        ))}
                    </Row>
                ))}
                <Pagination>{paginationItems}</Pagination>
            </div>
        </>
    );
}


export default Chercheur;
