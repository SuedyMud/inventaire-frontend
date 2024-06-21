import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button, ListGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { useQuery } from "react-query";
import { getDiscipline } from "../../utils/ApiGet.js";

function Discipline() {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(["discipline"], async () => {
        const accessToken = await getAccessTokenSilently();
        return getDiscipline({ accessToken });
    });

    // Fonction pour organiser les données en groupes de catégories
    const organizeDataByCategories = (data) => {
        const organizedData = {
            '100': [],
            '1000': [],
            '2000': [],
            '3000': [],
            '4000': [],
            '5000': [],
        };

        // Vérifier si data est défini avant d'itérer
        if (data) {
            data.forEach((item) => {
                const categoryId = parseInt(item.idcodecref.substring(0, 4));
                switch (true) {
                    case categoryId === 100:
                        organizedData['100'].push(item);
                        break;
                    case categoryId >= 1100 && categoryId < 2000:
                        organizedData['1000'].push(item);
                        break;
                    case categoryId >= 2100 && categoryId < 3000:
                        organizedData['2000'].push(item);
                        break;
                    case categoryId >= 3100 && categoryId < 4000:
                        organizedData['3000'].push(item);
                        break;
                    case categoryId >= 4100 && categoryId < 5000:
                        organizedData['4000'].push(item);
                        break;
                    case categoryId >= 5100 && categoryId < 6000:
                        organizedData['5000'].push(item);
                        break;
                    default:
                        console.error(`Catégorie inconnue: ${categoryId}`);
                        break;
                }
            });
        }

        return organizedData;
    };


    // Fonction pour afficher les éléments dans chaque catégorie
    const renderCategories = (data) => {
        const categories = {
            '100': 'Généralités',
            '1000': 'Sciences exactes et naturelles',
            '2000': 'Sciences de l\'ingénieur',
            '3000': 'Sciences bio-médicales et agricoles',
            '4000': 'Sciences sociales',
            '5000': 'Sciences humaines',
        };

        return Object.keys(categories).map((categoryId) => (
            <div key={categoryId}>
                <h3>{categories[categoryId]}</h3>
                {!isLoading && (
                    <ListGroup as="ul">
                        {data[categoryId].map((item) => (
                            <ListGroup.Item
                                as="li"
                                key={item.idcodecref}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <Link to={{
                                        pathname : `/disciplineDetail/${item.idcodecref}`,
                                        state: {
                                            discipline: item.discipline,
                                            disciplineUK: item.disciplineUK
                                        }
                                    }}
                                          style={{ textDecoration: 'none' }}>
                                        <p>{item.discipline}</p>
                                    </Link>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
        ));
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>

            <div className="row">
                <div className="col-md-8"> {/* Colonne prenant 9/12 de la largeur */}
                    <h2>Répertoire des Unités par Disciplines CREF</h2>
                </div>

                {/* <PermissionGuard permission={'read:information'}> */}
                <div className="col-md-4 text-right">
                    <Button variant="outline-primary" className="btn-custom" onClick={() => handleNavigation("/disciplineRecherche")}>
                        Recherche
                    </Button>
                    <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/disciplineStat")}>
                        Statistiques
                    </Button>
                    <Button variant="success" className="btn-custom" onClick={() => handleNavigation("/disciplineAjouter")}>
                        Ajouter
                    </Button>
                </div>
                {/* </PermissionGuard> */}
            </div>




            <div>
                {renderCategories(organizeDataByCategories(data))}
            </div>
        </>
    );
}

export default Discipline;
