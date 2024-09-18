import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UniteSupprimer({ idunite }) {
    const { getAccessTokenSilently } = useAuth0();
    const [showNotif, setShowNotif] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);  // Ajout pour gérer les erreurs
    const navigate = useNavigate();

    const handleDeleteClick = async () => {
        const accessToken = await getAccessTokenSilently();

        try {
            const response = await axios.delete(`/api/zunite/${idunite}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 204) {
                setShowNotif(true);
                console.log("Unité supprimée avec succès");

                setTimeout(() => {
                    navigate("/unite");
                }, 1000);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'unité : ", error);
            if (error.response && error.response.status === 409) {
                setErrorMsg("Impossible de supprimer l'unité car elle est encore associée à d'autres entités.");
            } else {
                setErrorMsg("Une erreur inattendue est survenue lors de la suppression de l'unité.");
            }
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
                    L'unité a été supprimée avec succès.
                </Alert>
            )}

            {errorMsg && (
                <Alert variant="warning" onClose={() => setErrorMsg(null)} dismissible>
                    {errorMsg}
                </Alert>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cette unité ? Cette action est irréversible.
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

export default UniteSupprimer;
