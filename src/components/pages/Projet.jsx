import {useQuery} from "react-query";
import {useAuth0} from "@auth0/auth0-react";
import {ListGroup, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Layout from "../structure/Layout.jsx";
import axios from "axios";

function Projet() {
    const {getAccessTokenSilently} = useAuth0();
    const {data, isLoading, isError} = useQuery(
        ["projetData", currentPage],
        async () => {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zprojet/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    size: 10, // number of items per page
                },
            });
            return response.data;
        }
    );

    const totalPages = data ? data.totalPages : 0;

    const currentPage = 0;

    const handlePreviousPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <>
            <Layout>
                <h2>Répertoire par Projets</h2>
                <div>
                    <ListGroup as="ul">
                        {data.content.map((item) => (
                            <ListGroup.Item
                                as="li"
                                key={item.idprojet}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <Link to={`/projet/${item.idprojet}`} style={{textDecoration: 'none'}}>
                                    <p>{item.nom}</p>
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="pagination">
                        <Button
                            variant="outline-secondary"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 0}
                        >
                            Page précédente
                        </Button>
                        <span className="mx-3">
                            Page {currentPage + 1} sur {totalPages}
                        </span>
                        <Button
                            variant="outline-secondary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                        >
                            Page suivante
                        </Button>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Projet;
