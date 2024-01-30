import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

function Faculte() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const liensFacultes = {
        "École de Santé publique": "https://esp.ulb.be/fr/la-recherche/les-centres-de-recherche",
        "École polytechnique de Bruxelles": "https://polytech.ulb.be/fr/recherche/sciences-de-l-ingenieur",
        "Faculté d'Architecture (La Cambre-Horta)": "https://archi.ulb.be/version-francaise/la-recherche/les-centres-de-recherche",
        "Faculté de Droit et de Criminologie": "https://droit.ulb.be/fr/navigation/la-recherche/nos-centres-de-recherche",
        "Faculté de Lettres, Traduction et Communication": "https://ltc.ulb.be/nos-centres-de-recherche",
        "Faculté de Médecine": " ",
        "Faculté de Pharmacie": "https://pharmacie.ulb.be/version-francaise/la-recherche/les-unites-de-recherche",
        "Faculté de Philosophie et Sciences Sociales": "https://phisoc.ulb.be/fr/centres-de-recherche",
        "Faculté des Sciences": "https://sciences.ulb.be/la-recherche/unites-de-recherche",
        "Faculté des Sciences de la Motricité": "https://fsm.ulb.be/fr/recherche/les-unites-de-recherche",
        "Faculté des Sciences psychologiques et de l'éducation": "https://psycho.ulb.be/la-recherche/les-centres-et-unites-de-recherche-1",
        "Faculté Solvay Brussels School of Economics and Managements": "https://sbsem.ulb.be/centres-de-recherche",
        "Instituts d'Enseignement Interfacultaire": "",
    };

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zfac/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    size: 30,

                },
            });

            if (response.status === 200) {

                // Trier les données par ordre alphabétique du nom de la faculté
                const sortedData = response.data.content.sort((a, b) => a.faculte.localeCompare(b.faculte));
                setData(sortedData);
                setTotalPages(response.data.totalPages);

               /* setData(response.data.content);
                setTotalPages(response.data.totalPages);*/
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
            <Header/>
            <h2>Répertoire des Unité par Facultés, Département</h2>
            <div>
                <ListGroup as="ol" numbered>
                    {data.map((item) => (
                        // Ajout d'une condition pour afficher uniquement les éléments avec actif='1' et invent20='1'
                        (item.actif === '1' && item.invent20 === '1') && (
                            <ListGroup.Item
                                as="li"
                                key={item.fac}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <a href={liensFacultes[item.faculte]}>{item.faculte}</a>

                                    <p>Faculté UK: {item.faculteUK}</p>
                                    <p>Sigle: {item.sigle}</p>
                                    <p>Date Maj: {item.dMaj}</p>
                                    <p>CC: {item.cc}</p>
                                    <p>Infofin: {item.infofin}</p>
                                    <p>ID Fac: {item.idFac}</p>
                                    <p>Actif: {item.actif}</p>
                                    <p>Groupe: {item.groupe}</p>
                                    <p>Invent20: {item.invent20}</p>
                                </div>
                            </ListGroup.Item>
                        )
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

export default Faculte;
