import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";

function ModifierDiscipline() {
    const { getAccessTokenSilently } = useAuth0();
    const { idcodecref } = useParams();
    const navigate = useNavigate();
    const [discipline, setDiscipline] = useState({
        discipline: "",
        disciplineUK: ""
    });
    const [error, setError] = useState("");
    const [showNotif, setShowNotif] = useState(false);

    // Récupérer les données de la discipline à partir de l'API
    useEffect(() => {
        const fetchDiscipline = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zdiscipcref/${idcodecref}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setDiscipline(response.data);
                } else {
                    setError("Erreur lors de la récupération des données de la discipline.");
                }
            } catch (error) {
                setError("Erreur lors de la récupération des données de la discipline.");
            }
        };

        fetchDiscipline();
    }, [idcodecref, getAccessTokenSilently]);

    // Gestion de la modification des champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiscipline({ ...discipline, [name]: value });
    };

    // Soumettre le formulaire pour mettre à jour la discipline
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setShowNotif(false);

        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.put(`/api/zdiscipcref/${idcodecref}`, discipline, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 3000);
                setTimeout(() => {
                    navigate("/discipline"); // Rediriger vers la liste des disciplines après la mise à jour
                }, 3000);
            } else {
                setError("Erreur lors de la mise à jour de la discipline.");
            }
        } catch (error) {
            setError("Erreur lors de la mise à jour de la discipline.");
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <h2>Modifier une Discipline</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {showNotif && <Alert variant="success">Discipline modifiée avec succès!</Alert>}

            <Form onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formDiscipline">
                        <Form.Label>Discipline *</Form.Label>
                        <Form.Control
                            type="text"
                            name="discipline"
                            value={discipline.discipline}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,255}$"
                            title="Le nom de la discipline ne peut pas contenir des chiffres (255 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formDisciplineUK">
                        <Form.Label>Discipline UK</Form.Label>
                        <Form.Control
                            type="text"
                            name="disciplineUK"
                            value={discipline.disciplineUK}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s]{1,255}$"
                            title="Le nom en anglais ne peut pas contenir des chiffres (255 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" className="btn-custom" type="submit">
                    Modifier
                </Button>
                <Button variant="secondary" className="btn-custom" onClick={() => handleNavigation(`/DisciplineDetail/${idcodecref}`)}>
                    Annuler
                </Button>
            </Form>
        </>
    );
}

export default ModifierDiscipline;
