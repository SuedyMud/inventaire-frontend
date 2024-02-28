import axios from "axios";
import Header from "../components/Header";
import Footer from '../components/Footer';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

function Unite() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zunite/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    size: 10, // nombre d'éléments par page
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
            <h2>Unite</h2>
            <div>
                <ListGroup as="ul">
                    {data.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idunite}
                            className="d-flex justify-content-between align-items-center my-1">
                            <div>
                                <h3>{item.nom}</h3>
                                {/*<p>ID: {item.idunite}</p>*/}
                                {/*<p>Description: {item.description}</p>
                                <p>Adresse: {item.rue}, {item.numero}, {item.boite}, {item.codepostal} {item.localite}</p>
                                <p>Téléphone: {item.telephone}</p>
                                <p>Fax: {item.fax}</p>
                                <p>Email: {item.email}</p>
                                <p>Site 1: {item.site1}</p>
                                <p>Site 2: {item.site2}</p>
                                <p>Lien Thèse: {item.lienthese}</p>
                                <p>Lien Publica: {item.lienpublica}</p>
                                <p>Date Début: {item.datedeb}</p>
                                <p>Date Fin: {item.datefin}</p>
                                <p>Date Mise à Jour: {item.datemaj}</p>
                                <p>Remarque: {item.remarque}</p>
                                <p>Nombre Visite: {item.nbvisit}</p>
                                <p>Brouillon: {item.brouillon}</p>
                                <p>Publication Préférée: {item.prefPublication}</p>
                                <p>Stat Export: {item.statExport}</p>
                                <p>Stat Projet CV: {item.statProjetcv}</p>
                                <p>Stat Anciens Membres: {item.statAnciensmembres}</p>
                                <p>Stat Délégué: {item.statDelegue}</p>
                                <p>Stat Adzion: {item.statAdzion}</p>
                                <p>Niveau: {item.niveau}</p>*/}
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
                        disabled={currentPage === totalPages - 1} >
                        Page suivante
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Unite;
