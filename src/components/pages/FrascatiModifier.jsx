import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function FrascatiModifier() {
    const { getAccessTokenSilently } = useAuth0();
    const { idfrascati } = useParams();
    const [frascatis, setFrascatis] = useState({
        frascati: "",
        frascatiUK: "",
        description: "",
        descriptionUK: "",
        refgrdiscip: "",
        ordre: "",
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFrascati = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zfrascati/${idfrascati}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setFrascatis(response.data);
                } else {
                    console.error("Erreur lors de la récupération du Frascati");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du Frascati : ", error);
            }
        };
        fetchFrascati();
    }, [idfrascati, getAccessTokenSilently]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFrascatis({ ...frascatis, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);
        setError("");

        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.put(`/api/zfrascati/${idfrascati}`, frascatis, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log("Frascati modifié avec succès");
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 3000);

                setTimeout(() => {
                    navigate("/frascati");
                }, 3000);
            } else {
                console.error("Erreur lors de la modification du Frascati");
                setError("Une erreur s'est produite lors de la modification du Frascati.");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du Frascati : ", error);
            setError("Une erreur s'est produite lors de la modification du Frascati.");
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <h2>Modifier un Frascati :</h2>
            <Form onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFrascati">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control
                            type="text"
                            name="frascati"
                            value={frascatis.frascati}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,255}$"
                            title="Le nom ne peut pas contenir des chiffres (255 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFrascatiUK">
                        <Form.Label>Nom UK</Form.Label>
                        <Form.Control
                            type="text"
                            name="frascatiUK"
                            value={frascatis.frascatiUK}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s]{1,255}$"
                            title="Le nom UK ne peut pas contenir des chiffres (255 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={frascatis.description}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,2500}$"
                            title="Description : lettres seulement, 2500 caractères max."
                            rows={3}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDescriptionUK">
                        <Form.Label>Description UK</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descriptionUK"
                            value={frascatis.descriptionUK}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,2500}$"
                            title="Description UK : lettres seulement, 2500 caractères max."
                            rows={3}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridRefGrDiscip">
                        <Form.Label>Référence Groupe Discipline *</Form.Label>
                        <Form.Control
                            type="text"
                            name="refgrdiscip"
                            value={frascatis.refgrdiscip}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridOrdre">
                        <Form.Label>Ordre *</Form.Label>
                        <Form.Control
                            type="text"
                            name="ordre"
                            value={frascatis.ordre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>

                {error && <Alert variant="danger">{error}</Alert>}
                {showNotif && <Alert variant="success">Frascati modifié avec succès!</Alert>}

                <div className="col-md-3 text-right">
                    <hr />
                    <p>* Information requise</p>
                    <Button variant="primary" className="btn-custom" type="submit">
                        Modifier
                    </Button>
                    <Button variant="secondary" className="btn-custom" onClick={() => handleNavigation(`/frascatiDetail/${idfrascati}`)}>
                        Annuler
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default FrascatiModifier;
