import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function Frascati() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);


    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zfrascati/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {

                    page: 0, // Page numéro 0 (première page)
                    size: 10000, // Nombre d'éléments par page
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
    const organizeDataByCategories = (data) => {
        const organizedData = {
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': [],
            '6': [],
        };

        data.forEach((item) => {
            organizedData[item.idfrascati[0]].push(item);
        });

        return organizedData;
    };

    // Fonction pour afficher les éléments dans chaque catégorie
    const renderCategories = (data) => {
        const categories = {
            '1': 'Sciences exactes et naturelles',
            '2': 'Sciences de l\'ingénieur',
            '3': 'Sciences médicales',
            '4': 'Sciences agronomiques',
            '5': 'Sciences sociales',
            '6': 'Sciences humaines',
        };

        return Object.keys(categories).map((categoryId) => (
            <div key={categoryId}>
                <h3>{categories[categoryId]}</h3>
                <ListGroup as="ul">
                    {data[categoryId].map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idfrascati}
                            className="d-flex justify-content-between align-items-center my-1"
                        >
                            <div>
                                <Link to={`api/frascati/${item.idfrascati}`} style={{ textDecoration: 'none' }}>
                                    <p>{item.idfrascati} {item.frascati}</p>
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
            <h2>Répertoire des Unités par Frascati</h2>
            <div>
                {renderCategories(organizeDataByCategories(data))}
            </div>
        </>
    );
}

export default Frascati;