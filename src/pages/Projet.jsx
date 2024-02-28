// Projet.jsx
import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import projetDetail from "./ProjetDetail.jsx";

function Projet() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zprojet/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    size: 20, // number of items per page
                },
            });

            if (response.status === 200) {
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
            } else {
                console.error("Erreur lors de la récupération des données");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données : ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, getAccessTokenSilently]);

    return (
        <>
            <Header />

            <h2>Liste des Projets</h2>
            <div>
                <ListGroup as="ul">
                    {data.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idprojet}
                            className="d-flex justify-content-between align-items-center my-1"
                            action onClick
                        >

                            <div>
                                <Link to={`/projet/${item.idprojet}`}>
                                    <h4>{item.nom}</h4>
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
                        disabled={currentPage === totalPages - 1}>
                        Page suivante
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Projet;
