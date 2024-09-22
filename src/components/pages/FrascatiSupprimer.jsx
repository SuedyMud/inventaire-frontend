import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FrascatiSupprimer({ idfrascati }) {
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
            const response = await axios.delete(`/api/zfrascati/${idfrascati}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 204) {
                setShowNotif(true);
                console.log("Frascati supprimé avec succès");

                setTimeout(() => {
                    navigate("/frascati");
                }, 1500);
            } else {
                setError("Erreur lors de la suppression du Frascati.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du Frascati : ", error);
            setError("Une erreur s'est produite lors de la suppression du Frascati.");
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
                    Le Frascati a été supprimé avec succès.
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
                    Êtes-vous sûr de vouloir supprimer ce Frascati ? Cette action est irréversible.
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

export default FrascatiSupprimer;
