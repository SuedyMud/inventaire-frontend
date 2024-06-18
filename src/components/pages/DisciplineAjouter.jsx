import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DisciplineAjouter() {
    const { getAccessTokenSilently } = useAuth0();
    const [disciplines, setDisciplines] = useState({
        idcodecref: "",
        discipline: "",
        disciplineUK: "",
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNextId = async () => {
            try {
                const response = await axios.get('/api/zdiscipcref/next-id');
                setDisciplines({ ...disciplines, idcodecref: response.data.nextId });
            } catch (error) {
                console.error('Erreur lors de la récupération du prochain ID de discipline:', error);
                setError("Une erreur s'est produite lors de la récupération du prochain ID de discipline.");
            }
        };

        fetchNextId();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDisciplines({ ...disciplines, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);
        setError("");

        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.post(`/api/zdiscipcref/ajouter`, disciplines, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 201) {
                console.log("Discipline créée avec succès");
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 2000);

                setTimeout(() => {
                    navigate("/discipline");
                }, 1000);
            } else {
                console.error("Erreur lors de la création de la discipline");
                setError("Une erreur s'est produite lors de la création de la discipline.");
            }
        } catch (error) {
            console.error("Erreur lors de la création de la discipline: ", error);
            setError("Une erreur s'est produite lors de la création de la discipline.");
        }
    };

    return (
        <>
            <h2>Ajouter une nouvelle discipline :</h2>

            <Form onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridIdDiscipline">
                        <Form.Label>Id Discipline *</Form.Label>
                        <Form.Control
                            type="text"
                            name="iddiscipline"
                            value={disciplines.idcodecref}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDiscipline">
                        <Form.Label>Discipline *</Form.Label>
                        <Form.Control
                            type="text"
                            name="discipline"
                            value={disciplines.discipline}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s'’.,\-]{1,120}$"
                            title="Discipline : lettres seulement, 120 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDisciplineUK">
                        <Form.Label>Discipline UK</Form.Label>
                        <Form.Control
                            type="text"
                            name="disciplineUK"
                            value={disciplines.disciplineUK}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,120}$"
                            title="Discipline UK : lettres seulement, 120 caractères max."
                        />
                    </Form.Group>
                </Row>

                <div className="col-md-3 text-right">
                    <hr />
                    <p>* Information requise</p>
                    <Button variant="primary" className="btn-custom" type="submit">
                        Envoyer
                    </Button>
                    <Button variant="secondary" className="btn-custom" onClick={() => navigate("/disciplines")}>
                        Annuler
                    </Button>
                </div>
            </Form>

            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    La discipline a été ajoutée avec succès.
                </Alert>
            )}
            {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                    {error}
                </Alert>
            )}
        </>
    );
}

export default DisciplineAjouter;
