import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function ChercheurDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idche } = useParams();
    const [chercheur, setChercheur] = useState(...prevState, []);



    useEffect(() => {
        const fetchChercheur = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`api/zchercheur/${idche}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log("ID du chercheur:", idche);
                /*console.log(":", response);*/

                if (response.status === 200) {
                    setChercheur(response.data);
                    console.log("Données reçues dans ChercheurDetail:", response.data); // Log des données reçues dans ChercheurDetail
                } else {
                    console.error("Erreur lors de la récupération du chercheur");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du chercheur : ", error);
            }
        };
        fetchChercheur();
    }, [idche, getAccessTokenSilently]);

    if (!chercheur) {
        return <div>Chargement...</div>;
    }

    // Récupération des props passées via Link
   /* console.log("Props passées:", chercheur);*/

    // Récupération des props passées via Link
    const { nom, prenom, telephone, cpi, site, email, campus } = chercheur;

    return (
        <div>
            <h2>Chercheur :</h2>
            <p>{nom} {prenom}</p>
            <p>Téléphone : {telephone}</p>
            <p>CPI : {cpi}</p>
            <p>Site Perso : {site}</p>
            <p>Email : {email}</p>
            <p>Campus : {campus}</p>
        </div>
    );
}

export default ChercheurDetail;
