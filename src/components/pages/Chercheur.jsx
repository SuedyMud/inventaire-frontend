import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import {ListGroup, Button} from "react-bootstrap";
import Layout from "../structure/Layout.jsx";
import {Link} from "react-router-dom";

function Chercheur() {
    const {getAccessTokenSilently} = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zchercheur/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    size: 10,
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
        <Layout>
            <h2>Répertoire des Chercheurs</h2>
            <div>
                <ListGroup as="ul">
                    {data.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idche}
                            className="d-flex justify-content-between align-items-center my-1">
                            <div>

                                <Link to={`/chercheur/${item.idche}`} style={{textDecoration: 'none'}}>
                                    <p> {item.nom} {item.prenom}</p>
                                </Link>


                                {/* <p>{item.prenom}</p>*/}
                                {/*<p>Titre: {item.titre}</p>
                                <p>Matricule: {item.matricule}</p>
                                <p>CPI: {item.cpi}</p>
                                <p>Téléphone: {item.telephone}</p>
                                <p>Email: {item.email}</p>
                                <p>Fax: {item.fax}</p>
                                <p>Site: {item.site}</p>
                                <p>Corps: {item.corps}</p>
                                <p>Date de Dig: {item.dDig}</p>
                                <p>FacChe: {item.facChe}</p>
                                <p>Publication Préférée: {item.prefPublication}</p>*/}
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className="pagination">
                    <Button
                        variant="outline-secondary"
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
                        disabled={currentPage === 0}>
                        Page précédente
                    </Button>
                    <span className="mx-3">
                        Page {currentPage + 1} sur {totalPages}
                    </span>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages - 1))}
                        disabled={currentPage === totalPages - 1}>
                        Page suivante
                    </Button>
                </div>
            </div>
        </Layout>
    );
}

export default Chercheur;
