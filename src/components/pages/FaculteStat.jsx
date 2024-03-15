import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup} from "react-bootstrap";
import { Link } from "react-router-dom";


function FaculteStat() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("api/zfac/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    const filteredData = response.data.content.filter(item => item.actif === 1 && item.invent20 === 1);

                    setData(filteredData.sort((a, b) => a.faculte.localeCompare(b.faculte)));
                    setTotalPages(response.data.totalPages);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently]);

    return (
        <div >
            <h2>Répertoires des Unités par Facultés, Départements</h2>
            <p>Classement par Facultés</p>
            <div>
                <ListGroup as="ul">
                    {data.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.fac}
                            className="d-flex justify-content-between align-items-center my-1"
                        >
                            <div>
                                <Link to={`/faculte/${item.fac}`} style={{textDecoration: 'none'}}>
                                    <p>{item.faculte}</p>
                                </Link>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
}

export default FaculteStat;