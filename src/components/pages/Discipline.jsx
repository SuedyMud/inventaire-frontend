import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

import { Link } from "react-router-dom";

function Discipline() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zdiscipcref/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                setData(response.data.content);
            } else {
                console.error("Erreur lors de la récupération des données");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données : ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [getAccessTokenSilently]);

    // Fonction pour organiser les données en groupes de catégories
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

        data.forEach((item) => {
            const categoryId = parseInt(item.idcodecref.substring(0, 4));
            switch (true) {
                case categoryId == 100:
                    organizedData['100'].push(item);
                    break;
                case categoryId >= 1100 && categoryId < 1500:
                    organizedData['1000'].push(item);
                    break;
                case categoryId >= 2000 && categoryId < 3000:
                    organizedData['2000'].push(item);
                    break;
                case categoryId >= 3000 && categoryId < 4000:
                    organizedData['3000'].push(item);
                    break;
                case categoryId >= 4000 && categoryId < 5000:
                    organizedData['4000'].push(item);
                    break;
                case categoryId >= 5000 && categoryId < 6000:
                    organizedData['5000'].push(item);
                    break;
                default:
                    console.error(`Catégorie inconnue: ${categoryId}`);
                    break;
            }
        });

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
                <ListGroup as="ul">
                    {data[categoryId].map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idcodecref}
                            className="d-flex justify-content-between align-items-center my-1"
                        >
                            <div>
                                <Link to={`api/discipline/${item.idcodecref}`} style={{ textDecoration: 'none' }}>
                                    <p>{item.idcodecref} {item.discipline}</p>
                                </Link>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        ));
    };

    return (
        <>
            <h2>Répertoire des Unités par Disciplines CREF</h2>
            <div>
                {renderCategories(organizeDataByCategories(data))}
            </div>
        </>
    );
}

export default Discipline;
