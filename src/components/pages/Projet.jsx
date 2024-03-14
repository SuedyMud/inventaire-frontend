import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {useEffect, useState} from "react";
import {ListGroup} from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

function Projet() {
    const {getAccessTokenSilently} = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("api/zprojet/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        page: currentPage,
                        size: 20,
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
        fetchData();
    }, [currentPage, getAccessTokenSilently]);


    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage + 1} onClick={() => handlePaginationClick(number - 1)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <>
            <h2>Répertoire par Projets</h2>
            <div>
                <ListGroup as="ul">
                    {data.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idprojet}
                            className="d-flex justify-content-between align-items-center my-1"
                        >
                            <div>
                                <Link to={`/projet/${item.idprojet}`} style={{textDecoration: 'none'}}>
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
