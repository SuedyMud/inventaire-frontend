import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

function ChercheurDetails() {
    const { getAccessTokenSilently } = useAuth0();
    const { type } = useParams();
    const [chercheurs, setChercheurs] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("/api/zchercheur/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 1000000,
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content.filter(
                        (item) => item.idche !== ""
                    );

                    let filteredChercheurs;
                    switch (type) {
                        case "sans-telephone":
                            filteredChercheurs = filteredData.filter((item) => item.telephone === "");
                            setTitle("Chercheurs sans téléphone");
                            break;
                        case "sans-email":
                            filteredChercheurs = filteredData.filter((item) => item.email === "");
                            setTitle("Chercheurs sans e-mail");
                            break;
                        case "sans-site":
                            filteredChercheurs = filteredData.filter((item) => item.site === "");
                            setTitle("Chercheurs sans site web");
                            break;
                        default:
                            filteredChercheurs = [];
                            setTitle("Détails des chercheurs");
                    }

                    setChercheurs(filteredChercheurs);
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
                {chercheurs.map((chercheur) => (
                    <li key={chercheur.idche}>
                        <Link to={`/chercheurDetail/${chercheur.idche}`}>
                            {chercheur.nom} {chercheur.prenom}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChercheurDetails;
