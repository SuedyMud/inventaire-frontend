import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {FaEnvelope, FaGlobe, FaPhone} from "react-icons/fa";

function ChercheurDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idche } = useParams();
    const [chercheur, setChercheur] = useState(null);

    useEffect(() => {
        const fetchChercheur = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zchercheur/${idche}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setChercheur(response.data);
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

    const { nom, prenom, telephone, cpi, site, email, campus } = chercheur;

    return (
        <div>
            <h3>{prenom} {nom}</h3>
            <p><FaPhone /> Téléphone : {telephone}</p>
            <p><FaEnvelope /> Email : <a href={`mailto:${email}`}>{email}</a></p>
            <p><FaGlobe /> Site : <a href={site}>{site}</a></p>
            <p>CPI : {cpi}</p>
            <p>Campus : {campus}</p>
        </div>
    );
}

export default ChercheurDetail;
