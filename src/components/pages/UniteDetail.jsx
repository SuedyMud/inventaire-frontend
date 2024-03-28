import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UniteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idunite } = useParams();
    const [unite, setUnite] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zunite/${idunite}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setUnite(response.data);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [idunite, getAccessTokenSilently]);

    return (
        <>
            <h2>Répertoire par Unité</h2>
            {unite && ( // Vérifie si unite est défini
                <div>
                    <p>Campus : {unite.corps}</p>
                    <p>Localisation : {unite.localisation}</p>
                    <p>Adresse : {unite.rue} {unite.numero}, {unite.codePostal} {unite.localite}</p>
                    <p>Email : {unite.email}</p>
                    <p>Site Web : {unite.site}</p>
                </div>
            )}
        </>
    );
}

export default UniteDetail;
