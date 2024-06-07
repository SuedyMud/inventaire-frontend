import {useAuth0} from "@auth0/auth0-react";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {getFrascati} from "../../utils/ApiGet.js";

function Frascati() {
    const {getAccessTokenSilently} = useAuth0();

    const {data, isLoading} = useQuery(["frascati"], async () =>
        getFrascati({accessToken: await getAccessTokenSilently()})
    );

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

        // Vérifier si data est défini avant d'itérer
        if (data) {
            data.forEach((item) => {
                organizedData[item.idfrascati[0]].push(item);
            });
        }

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
                {!isLoading && (
                    <ListGroup as="ul">
                        {data[categoryId].map((item) => (
                            <ListGroup.Item
                                as="li"
                                key={item.idfrascati}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <Link to={{
                                        pathname: `/frascatiDetail/${item.idfrascati}`,
                                        state: {
                                            description: item.description
                                        }

                                    }} style={{textDecoration: 'none'}}>
                                        <p>{item.idfrascati} {item.frascati}</p>
                                    </Link>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
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
