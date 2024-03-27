import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FaEnvelope, FaGlobe, FaPhone } from "react-icons/fa";
import { Button } from "react-bootstrap";

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

    const handleDeleteClick = async (id) => {
        const accessToken = await getAccessTokenSilently();

        try {
            const response = await axios.delete(`/api/zchercheur/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 204) {
                // Redirection ou autre action après suppression
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du chercheur : ", error);
        }
    };

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

            <Link to={`/chercheurUpdate/${idche}`}>
                <Button variant="primary">
                    Modifier
                </Button>
            </Link>

            <Button
                variant="danger"
                onClick={() => handleDeleteClick(idche)}
                className="ml-2"
            >
                Supprimer
            </Button>
        </div>
    );
}

export default ChercheurDetail;
