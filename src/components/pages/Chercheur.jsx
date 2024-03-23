import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

function Chercheur() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState('A');

    const fetchData = async (letter) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zchercheur/liste", {
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
            } else {
                console.error("Erreur lors de la récupération des données");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données : ", error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, getAccessTokenSilently]);

    const handlePaginationClick = (letter) => {
        setCurrentPage(letter);
    };

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
                                        <Link to={`/chercheur/${item.idche}`} style={{ textDecoration: 'none' }}>
                                            <p>{item.nom} {item.prenom}</p>
                                        </Link>
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
