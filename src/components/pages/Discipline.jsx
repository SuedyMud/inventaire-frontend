import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import {ListGroup, Button} from "react-bootstrap";

import {Link} from "react-router-dom";

function Discipline() {
    const {getAccessTokenSilently} = useAuth0();
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


    return (

            <>
                <h2>Répertoire des Unités par Disciplines CREF</h2>
                <div>
                    <ListGroup as="ul">
                        {data.map((item) => (
                            <ListGroup.Item
                                as="li"
                                key={item.idcodecref}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>

                                    <Link to={`/discipline/${item.idcodecref}`} style={{textDecoration: 'none'}}>
                                        <p>{item.discipline}</p>
                                    </Link>

                                    {/*<p>Discipline UK: {item.disciplineUK}</p>*/}


                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                </div>
            </>
    );
}

export default Discipline;
