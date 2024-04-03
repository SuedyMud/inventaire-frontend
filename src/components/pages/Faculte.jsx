import { useAuth0 } from "@auth0/auth0-react";
import { ListGroup } from "react-bootstrap";
import {useQuery} from "react-query";
import {getFaculte} from "../../utils/api.js";


function Faculte() {
    const { getAccessTokenSilently } = useAuth0();

    const {data, isLoading} = useQuery(["faculties"], () =>
        getFaculte({accessToken : getAccessTokenSilently()}))

    const liensFacultes = {
        "École de Santé publique": "https://esp.ulb.be/fr/la-recherche/les-centres-de-recherche",
        "École polytechnique de Bruxelles": "https://polytech.ulb.be/fr/recherche/sciences-de-l-ingenieur",
        "Faculté d'Architecture (La Cambre-Horta)": "https://archi.ulb.be/version-francaise/la-recherche/les-centres-de-recherche",
        "Faculté de Droit et de Criminologie": "https://droit.ulb.be/fr/navigation/la-recherche/nos-centres-de-recherche",
        "Faculté de Lettres, Traduction et Communication": "https://ltc.ulb.be/nos-centres-de-recherche",
        "Faculté de Médecine": "",
        "Faculté de Pharmacie": "https://pharmacie.ulb.be/version-francaise/la-recherche/les-unites-de-recherche",
        "Faculté de Philosophie et Sciences Sociales": "https://phisoc.ulb.be/fr/centres-de-recherche",
        "Faculté des Sciences": "https://sciences.ulb.be/la-recherche/unites-de-recherche",
        "Faculté des Sciences de la Motricité": "https://fsm.ulb.be/fr/recherche/les-unites-de-recherche",
        "Faculté des Sciences psychologiques et de l'éducation": "https://psycho.ulb.be/la-recherche/les-centres-et-unites-de-recherche-1",
        "Faculté Solvay Brussels School of Economics and Managements": "https://sbsem.ulb.be/centres-de-recherche",
        "Instituts d'Enseignement Interfacultaire": "",
    };

    return (
        <div>
            <h2>Répertoires des Unités par Facultés, Départements</h2>
            <p>Classement par Facultés</p>
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
        </div>
    );
}

export default Faculte;
