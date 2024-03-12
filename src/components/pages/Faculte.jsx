import { useAuth0 } from "@auth0/auth0-react";
import { ListGroup, Button } from "react-bootstrap";
import Layout from "../structure/Layout.jsx";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

function Faculte() {
    const { getAccessTokenSilently } = useAuth0();
    const [currentPage, setCurrentPage] = useState(0);

    const { data, status, error } = useQuery({
        queryKey: ["faculteData"],
        queryFn: async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("api/zfac/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        page: currentPage,
                        size: 10,
                    },
                });
                console.log(response.data); // Vérifiez les données renvoyées par l'API
                return response.data;
            } catch (error) {
                throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
            }
        },
    });

    const totalPages = data?.totalPages || 0;

    return (
        <>
            <Layout>
                <h2>Répertoires des Unités par Facultés, Départements</h2>
                <div>
                    <ListGroup as="ul">
                        {status === "loading" && <p>chargement en cours...</p>}
                        {error && <p>Erreur : {error.message}</p>}
                        {status === "success" && Array.isArray(data) && data.map((item) => (
                            <ListGroup.Item
                                as="li"
                                key={item.fac}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <Link to={`/faculte/${item.fac}`} style={{textDecoration: 'none'}}>
                                        <p>{item.faculte}</p>
                                    </Link>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="pagination">
                        <Button
                            variant="outline-secondary"
                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
                            disabled={currentPage === 0}
                        >
                            Page précédente
                        </Button>
                        <span className="mx-3">
                            Page {currentPage + 1} sur {totalPages}
                        </span>
                        <Button
                            variant="outline-secondary"
                            onClick={() =>
                                setCurrentPage(Math.min(currentPage + 1, totalPages - 1))
                            }
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

export default Faculte;
