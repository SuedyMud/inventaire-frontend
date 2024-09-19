import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FaculteSupprimer({ fac }) {
    const { getAccessTokenSilently } = useAuth0();
    const [showNotif, setShowNotif] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fonction pour supprimer la faculté
    const handleDeleteClick = async () => {
        setShowNotif(false);
        setError("");

        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.delete(`/api/zfac/${fac}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 204) {
                setShowNotif(true);
                console.log("Faculté supprimée avec succès");

                // Redirection après la suppression
                setTimeout(() => {
                    navigate("/faculte");
                }, 1700);
            } else {
                setError("Erreur lors de la suppression de la faculté.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la faculté : ", error);
            setError("Une erreur s'est produite lors de la suppression de la faculté.");
        }
    };

    // Confirmer la suppression
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
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    La faculté a été supprimée avec succès.
                </Alert>
            )}

            {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                    {error}
                </Alert>
            )}

            {/* Modal de confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cette faculté ? Cette action est irréversible.
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

export default FaculteSupprimer;
