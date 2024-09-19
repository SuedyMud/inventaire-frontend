import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DisciplineSupprimer({ idcodecref }) {
    const { getAccessTokenSilently } = useAuth0();
    const [showNotif, setShowNotif] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleDeleteClick = async () => {
        setShowNotif(false);
        setError("");

        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.delete(`/api/zdiscipcref/${idcodecref}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 204) {
                setShowNotif(true);
                console.log("Discipline supprimée avec succès");

                setTimeout(() => {
                    navigate("/discipline"); // Redirection vers la liste des disciplines après suppression
                }, 1500);
            } else {
                setError("Erreur lors de la suppression de la discipline.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la discipline : ", error);
            setError("Une erreur s'est produite lors de la suppression de la discipline.");
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
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    La discipline a été supprimée avec succès.
                </Alert>
            )}

            {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                    {error}
                </Alert>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cette discipline ? Cette action est irréversible.
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

export default DisciplineSupprimer;
