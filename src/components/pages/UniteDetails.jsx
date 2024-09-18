import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

function UniteDetails() {
    const { getAccessTokenSilently } = useAuth0();
    const { type } = useParams();
    const [unites, setUnites] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("/api/zunite/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 10000,
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content.filter(
                        (item) => item.datefin === null
                    );

                    let filteredUnites;
                    switch (type) {
                        case "sans-nom":
                            filteredUnites = filteredData.filter((item) => item.nom === "");
                            setTitle("Unités sans nom");
                            break;
                        case "sans-nom-uk":
                            filteredUnites = filteredData.filter((item) => item.nomUK === "");
                            setTitle("Unités sans nom en anglais");
                            break;
                        case "sans-description":
                            filteredUnites = filteredData.filter((item) => item.description === "");
                            setTitle("Unités sans description");
                            break;
                        case "sans-localite":
                            filteredUnites = filteredData.filter((item) => item.localite === "");
                            setTitle("Unités sans localité");
                            break;
                        case "sans-telephone":
                            filteredUnites = filteredData.filter((item) => item.telephone === "");
                            setTitle("Unités sans téléphone");
                            break;
                        case "sans-fax":
                            filteredUnites = filteredData.filter((item) => item.fax === "" || item.fax === "NEANT");
                            setTitle("Unités sans fax");
                            break;
                        case "sans-rue":
                            filteredUnites = filteredData.filter((item) => item.rue === "");
                            setTitle("Unités sans adresse physique");
                            break;
                        case "sans-email":
                            filteredUnites = filteredData.filter((item) => item.email === "");
                            setTitle("Unités sans email");
                            break;
                        default:
                            filteredUnites = [];
                            setTitle("Détails des unités");
                    }

                    setUnites(filteredUnites);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently, type]);

    return (
        <div className="container">
            <h2>{title}</h2>
            <ul>
                {unites.map((unite) => (
                    <li key={unite.idunite}>
                        <Link to={`/uniteDetail/${unite.idunite}`}>
                            {unite.nom} {/*(ID: {unite.idunite})*/}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UniteDetails;
