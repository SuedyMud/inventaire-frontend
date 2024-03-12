import axios from "axios";
import Header from "../structure/Header.jsx";
import Footer from "../structure/Footer.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

function ProjetDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get(`api/zprojet/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    size: 10, // number of items per page
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
                <ListGroup>
                    {data.map((item) => (
                        <ListGroup.Item key={item.idprojet} className="d-flex justify-content-between align-items-center my-1">
                            <div onClick={() => handleItemClick(item.idprojet)}>
                                <h4>{item.nom}</h4>
                            </div>
                            {selectedItemId === item.idprojet && (
                                <div>
                                    <p>Date début: {item.datedebut}</p>
                                    <p>Date fin: {item.datefin}</p>
                                    <p>Résumé: {item.resume}</p>
                                    <p>Site: {item.site}</p>
                                    <p>Début de l'inscription: {item.dDebut}</p>
                                    <p>Ordre: {item.ordre}</p>
                                    <p>Programme: {item.nomprogramme}</p>
                                    <p>Programme (en anglais): {item.nomprogrammeUK}</p>
                                    <p>Résumé (en anglais): {item.resumeUK}</p>
                                    <p>Fin de l'inscription: {item.dFin}</p>
                                    <p>Projet provenant de CV: {item.fromCv}</p>
                                </div>
                            )}
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
            <Footer />
        </>
    );
}

export default ProjetDetail;
