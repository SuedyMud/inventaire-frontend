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

    if (!unite) {
        return null; // Ou vous pouvez retourner un composant de chargement ou un message d'attente
    }

    // Déstructuration des propriétés de l'objet unite
    const { corps, localisation, rue, numero, codePostal, localite, email, site } = unite;

    return (
        <>
            <h2>Répertoire par Unité</h2>
            <div>
                <p>Campus : {corps}</p>
                <p>Localisation : {localisation}</p>
                <p>Adresse : {rue} {numero}, {codePostal} {localite}</p>
                <p>Email : {email}</p>
                <p>Site Web : {site}</p>
            </div>
        </>
    );
}

export default UniteDetail;
