import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ChercheurDelete({ idche }) {
    const { getAccessTokenSilently } = useAuth0();
    const [showNotif, setShowNotif] = useState(false);
    const [showModal, setShowModal] = useState(false); // État pour contrôler l'affichage de la modal
    const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

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

                // Redirection après un court délai pour afficher la notification
                setTimeout(() => {
                    navigate("/chercheur");
                }, 2000); // 2 secondes de délai avant la redirection
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du chercheur : ", error);
        }
    };

    const handleConfirmDelete = () => {
        setShowModal(false);
        handleDeleteClick();
    };

    return (
        <div>
            <Button variant="danger" onClick={() => setShowModal(true)}>
                Supprimer
            </Button>

            {showNotif && (
                <Alert variant="danger" onClose={() => setShowNotif(false)} dismissible>
                    Le chercheur a été supprimé avec succès.
                </Alert>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer ce chercheur ? Cette action est irréversible.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ChercheurDelete;
