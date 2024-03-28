import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert } from "react-bootstrap";

function ChercheurDelete({ idche }) { // Prends idche en tant que props
    const { getAccessTokenSilently } = useAuth0();
    const [chercheur, setChercheur] = useState({
        nom: "",
        prenom: "",
        telephone: "",
        cpi: "",
        site: "",
        email: "",
        campus: ""
    });

    const [showNotif, setShowNotif] = useState(false);

    useEffect(() => {
        const fetchChercheur = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`api/zchercheur/${idche}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setChercheur(response.data);
                    console.log("Informations récupérées du chercheur :", response.data); // Ajout du console log
                } else {
                    console.error("Erreur lors de la récupération du chercheur");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du chercheur : ", error);
            }
        };
        fetchChercheur();
    }, [idche, getAccessTokenSilently]);

    const handleDeleteClick = async () => {
        const accessToken = await getAccessTokenSilently();

        try {
            const response = await axios.delete(`/api/zchercheur/${idche}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 204) {
                setShowNotif(true);
                console.log("Chercheur supprimé avec succès");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du chercheur : ", error);
        }
    };

    return (
        <div>


                <Button variant="danger" onClick={handleDeleteClick}>
                    Supprimer
                </Button>

            {showNotif && (
                <Alert variant="danger" onClose={() => setShowNotif(false)} dismissible>
                    Le chercheur a été supprimé avec succès.
                </Alert>
            )}
        </div>
    );
}

export default ChercheurDelete;
