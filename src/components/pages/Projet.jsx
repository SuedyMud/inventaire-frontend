import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

function Projet() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState('A');
    const [totalPages, setTotalPages] = useState(0);
    const [firstLetters, setFirstLetters] = useState([]);

    useEffect(() => {
        const fetchData = async (letter) => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("api/zprojet/liste", {
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

                    const letters = sortedData.map(item => item.nom.charAt(0).toUpperCase());
                    const uniqueLetters = [...new Set(letters)];
                    setFirstLetters(uniqueLetters);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };
        fetchData(currentPage);
    }, [currentPage, getAccessTokenSilently]);

    const handlePaginationClick = (letter) => {
        setCurrentPage(letter);
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const paginationItems = alphabet.split('').map((letter, index) => {
        const letterIsActive = firstLetters.includes(letter);
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
            <h2>Répertoire par Projets</h2>
            <div>
                <ListGroup as="ul">
                    {filteredData.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idprojet}
                            className="d-flex justify-content-between align-items-center my-1"
                        >
                            <div>
                                <Link to={`/projet/${item.idprojet}`} style={{ textDecoration: 'none' }}>
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

export default Projet;
