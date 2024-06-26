import { useAuth0 } from "@auth0/auth0-react";
import {Button, ListGroup} from "react-bootstrap";
import {useQuery} from "react-query";
import {getFaculte} from "../../utils/ApiGet.js";
import {Link, useNavigate} from "react-router-dom";
import PermissionGuard from "../../utils/PermissionGuard.jsx";


function Faculte() {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const {data, isLoading} = useQuery(["faculties"], () =>
        getFaculte({accessToken : getAccessTokenSilently()
        }))

    const liensFacultes = {
        "École de Santé publique": "https://esp.ulb.be/fr/la-recherche/les-centres-de-recherche",
        "École polytechnique de Bruxelles": "https://polytech.ulb.be/fr/recherche/sciences-de-l-ingenieur",
        "Faculté d'Architecture (La Cambre-Horta)": "https://archi.ulb.be/version-francaise/la-recherche/les-centres-de-recherche",
        "Faculté de Droit et de Criminologie": "https://droit.ulb.be/fr/navigation/la-recherche/nos-centres-de-recherche",
        "Faculté de Lettres, Traduction et Communication": "https://ltc.ulb.be/nos-centres-de-recherche",
        "Faculté de Médecine": "https://medecine.ulb.be/",
        "Faculté de Pharmacie": "https://pharmacie.ulb.be/version-francaise/la-recherche/les-unites-de-recherche",
        "Faculté de Philosophie et Sciences Sociales": "https://phisoc.ulb.be/fr/centres-de-recherche",
        "Faculté des Sciences": "https://sciences.ulb.be/la-recherche/unites-de-recherche",
        "Faculté des Sciences de la Motricité": "https://fsm.ulb.be/fr/recherche/les-unites-de-recherche",
        "Faculté des Sciences psychologiques et de l'éducation": "https://psycho.ulb.be/la-recherche/les-centres-et-unites-de-recherche-1",
        "Faculté Solvay Brussels School of Economics and Managements": "https://sbsem.ulb.be/centres-de-recherche",
        "Institut d'études européennes": "https://www.iee-ulb.eu/en/",
        "Instituts d'Enseignement Interfacultaire": "https://www.ulb.be/fr/instituts-ressources-contacts/instituts-interfacultaires",
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>

            <div className="row">
                <div className="col-md-9"> {/* Colonne prenant 9/12 de la largeur */}
                    <h2>Répertoires des Unités par Facultés, Départements</h2>
                    <p>Classement par Facultés</p>
                </div>
                <div className="col-md-3 text-right"> {/* Colonne prenant 3/12 de la largeur et alignée à droite */}
                    <Button variant="outline-primary" className="btn-custom" onClick={() => handleNavigation("/faculteRecherche")}>
                        Recherche
                    </Button>

                    <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/faculteStat")}>
                        Statistiques
                    </Button>
                    <PermissionGuard permission={'read:all-information'}>
                    <Button variant="success" className="btn-custom" onClick={() => handleNavigation("/faculteAjouter")}>
                        Ajouter
                    </Button>
                    </PermissionGuard>
                </div>
            </div>


            <div>
                {!isLoading && (
                    <ListGroup as="ul">
                        {data.map((item) => (
                            <ListGroup.Item
                                as="li"
                                key={item.fac}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <a
                                        href={liensFacultes[item.faculte]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <p>{item.faculte}</p>
                                    </a>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
                  {/*</PermissionGuard>*/}
        </div>
    );
}

export default Faculte;
