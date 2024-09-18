import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

function FrascatiDetails() {
    const { getAccessTokenSilently } = useAuth0();
    const { type } = useParams();
    const [frascatis, setFrascatis] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("/api/zfrascati/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 10000,
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content;

                    let filteredFrascatis;
                    switch (type) {
                        case "sans-nom":
                            filteredFrascatis = filteredData.filter((item) => item.nom === "");
                            setTitle("Frascatis sans nom");
                            break;
                        case "sans-nom-uk":
                            filteredFrascatis = filteredData.filter((item) => item.nomUK === "");
                            setTitle("Frascatis sans nom en anglais");
                            break;
                        case "sans-description":
                            filteredFrascatis = filteredData.filter((item) => item.description === "");
                            setTitle("Frascatis sans description");
                            break;
                        case "sans-description-uk":
                            filteredFrascatis = filteredData.filter((item) => item.descriptionUK === "");
                            setTitle("Frascatis sans description en anglais");
                            break;
                        default:
                            filteredFrascatis = [];
                            setTitle("Détails des Frascatis");
                    }

                    setFrascatis(filteredFrascatis);
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
                {frascatis.map((frascati) => (
                    <li key={frascati.idfrascati}>
                        <Link to={`/frascatiDetail/${frascati.idfrascati}`}>
                            {frascati.frascati}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FrascatiDetails;
