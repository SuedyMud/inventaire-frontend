import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import {Link} from "react-router-dom";



function UniteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("api/zunite/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        page: currentPage,
                    },
                });

                if (response.status === 200) {

                    setData(response.data.content);
                    setTotalPages(response.data.totalPages);

                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData(currentPage);
    }, [currentPage, getAccessTokenSilently]);


    return (
        <>
            <h2>Répertoires par Unités</h2>
            <div>
                <ListGroup as="ul">
                    {data && data.map((item)  => (
                        <ListGroup.Item
                            as="li"
                            key={item.idunite}
                            className="d-flex justify-content-between align-items-center my-1">
                            <div>
                                <Link to={`/unite/${item.idunite}`} style={{ textDecoration: 'none' }}>
                                    <p>{item.nom}</p>
                                </Link>
                            </div>

                            <div>
                                <p>(Code : {item.idunite})</p>

                                <p>Responsables de l'unité :  </p>

                                <p>Description: {item.Description}</p>

                                <p>Fax: {item.fax}</p>
                                <p>Site: {item.site}</p>
                                <p>Campus : {item.corps}</p>
                                <p>Adresse : {item.dDig}</p>
                                <p>Email : {item.Email}</p>
                                <p>Site Web : {item.site1}</p>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

            </div>
        </>
    );
}

export default UniteDetail;
