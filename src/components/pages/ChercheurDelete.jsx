import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert } from "react-bootstrap";

function ChercheurDelete() {
    const { getAccessTokenSilently } = useAuth0();
    const { idche } = useParams();
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChercheur({ ...chercheur, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);

        const accessToken = await getAccessTokenSilently();

        try {
            const response = await axios.put(`/api/zchercheur/${idche}`, chercheur, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 3000);
            } else {
                console.error("Erreur lors de la modification du chercheur");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du chercheur : ", error);
        }
    };

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
            <h2>Modifier Chercheur :</h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="nom">
                    <Form.Label>Nom :</Form.Label>
                    <Form.Control
                        type="text"
                        name="nom"
                        value={chercheur.nom}
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* Ajoutez d'autres champs ici avec le même modèle */}

                <Button variant="primary" type="submit">
                    Modifier
                </Button>
                <Button variant="danger" onClick={handleDeleteClick} className="ml-2">
                    Supprimer
                </Button>
            </Form>
            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    Le chercheur a été modifié avec succès.
                </Alert>
            )}
        </div>
    );
}

export default ChercheurDelete;
