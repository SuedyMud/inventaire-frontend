import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function FaculteStat() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [totalFacultes, setTotalFacultes] = useState(0);
    const [totalFaculteUk, setTotalFaculteUk] = useState(0);
    const [totalSigles, setTotalSigles] = useState(0);
    const [totalDateMajs, setTotalDateMajs] = useState(0);
    const [totalTactifs, setTotalTactifs] = useState(0);
    const [totalGroupes, setTotalGroupes] = useState(0);

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
                    const filteredData = response.data.content.filter(
                        (item) => item.actif === 1 && item.invent20 === 1
                    );

                    setData(
                        filteredData.sort((a, b) => a.faculte.localeCompare(b.faculte))
                    );
                    setTotalFacultes(response.data.totalFacultes);
                    setTotalFaculteUk(response.data.totalFaculteUk);
                    setTotalSigles(response.data.totalSigles);
                    setTotalDateMajs(response.data.totalDateMajs);
                    setTotalTactifs(response.data.totalTactifs);
                    setTotalGroupes(response.data.totalGroupes);
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
        <div>
            <h2>Les statistiques</h2>
            <div>
                {totalFacultes !== 0 && (
                    <p>Il y a {totalFacultes} facultés au total</p>
                )}
                {totalFaculteUk !== 0 && (
                    <p>
                        {totalFaculteUk} facultés ont un nom en anglais (
                        {((totalFaculteUk / totalFacultes) * 100).toFixed(0)}%)
                    </p>
                )}
                {totalSigles !== 0 && (
                    <p>{totalSigles} facultés proviennent de l Instituts d Enseignement Interfacultaire</p>
                )}
                {totalDateMajs !== 0 && (
                    <p>{totalDateMajs} facultés ne possèdent pas de date de mise à jour</p>
                )}
                {totalTactifs !== 0 && (
                    <p>Actuellement, il y a {totalTactifs} facultés actives</p>
                )}
                {totalGroupes !== 0 && (
                    <p>{totalGroupes} facultés proviennent du PoLE SANTÉ</p>
                )}
            </div>
            <div>
                <h2>Répertoires des Unités par Facultés, Départements</h2>
                <p>Classement par Facultés</p>
                <ListGroup as="ul">
                    {data.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.fac}
                            className="d-flex justify-content-between align-items-center my-1"
                        >
                            <div>
                                <Link to={`/faculte/${item.fac}`} style={{ textDecoration: 'none' }}>
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
