import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

function Chercheur() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState('A');
    const [totalPages, setTotalPages] = useState(0);
    const [firstLetters, setFirstLetters] = useState([]);

    const fetchData = async (letter) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zchercheur/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    lettre: letter,
                },
            });

            if (response.status === 200) {
                const sortedData = response.data.content.sort((a, b) => a.nom.localeCompare(b.nom));
                setData(sortedData);
                setTotalPages(response.data.totalPages);
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

    return (
        <>
            <h2>Répertoire des Chercheurs</h2>
            <div>
                <ListGroup as="ul">
                    {filteredData.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idche}
                            className="d-flex justify-content-between align-items-center my-1">
                            <div>
                                <Link to={`/chercheur/${item.idche}`} style={{ textDecoration: 'none' }}>
                                    <p>{item.nom}</p>
                                </Link>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className="pagination">
                    <Pagination>{paginationItems}</Pagination>
                </div>
            </div>
        </>
    );
}

export default Chercheur;
