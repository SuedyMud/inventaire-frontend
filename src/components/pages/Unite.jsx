import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

function Unite() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [firstLetters, setFirstLetters] = useState([]);

    const fetchData = async (page) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zunite/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: page,
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

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, getAccessTokenSilently]);

    const handlePaginationClick = (letter) => {
        const index = firstLetters.indexOf(letter);
        setCurrentPage(index);
    };

    const paginationItems = firstLetters.map((letter, index) => (
        <Pagination.Item key={index} active={index === currentPage} onClick={() => handlePaginationClick(letter)}>
            {letter}
        </Pagination.Item>
    ));

    return (
        <>
            <h2>Répertoires par Unités</h2>
            <div>
                <ListGroup as="ul">
                    {data.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idunite}
                            className="d-flex justify-content-between align-items-center my-1">
                            <div>
                                <Link to={`/unite/${item.idunite}`} style={{ textDecoration: 'none' }}>
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

export default Unite;
