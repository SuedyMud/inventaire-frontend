import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FrascatiAjouter() {
    const { getAccessTokenSilently } = useAuth0();
    const [frascatis, setFrascatis] = useState({
        idfrascati: "",
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

    // Générateur d'identifiant flottant pour 'idfrascati'
    const generateFloatingId = () => {
        // Génère un nombre flottant entre 1.0 et 9.9
        return (Math.random() * 9 + 1).toFixed(1);
    };

    // Extraire la partie entière (avant la virgule) et la partie décimale (après la virgule)
    const extractParts = (floatingNumber) => {
        const [integerPart, decimalPart] = floatingNumber.split(".");
        return {
            integerPart, // Partie entière
            decimalPart, // Partie après la virgule
        };
    };

    // Initialiser les valeurs générées lors du montage du composant
    useEffect(() => {
        const idFrascati = generateFloatingId();
        const { integerPart, decimalPart } = extractParts(idFrascati);

        setFrascatis(prevFrascati => ({
            ...prevFrascati,
            idfrascati: idFrascati,      // ID flottant complet
            refgrdiscip: integerPart,    // Partie entière pour 'refgrdiscip'
            ordre: decimalPart,          // Partie décimale pour 'ordre'
        }));
    }, []);

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
            const response = await axios.post(`/api/zfrascati/ajouter`, frascatis, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 201) {
                console.log("Frascati ajouté avec succès");
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 2000);
                setTimeout(() => {
                    navigate("/frascati");
                }, 1000);
            } else {
                console.error("Erreur lors de l'ajout du Frascati");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du Frascati : ", error);
            setError("Une erreur s'est produite lors de l'ajout du Frascati.");
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <h2>Ajouter nouveau Frascati :</h2>
            <Form onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridIdFrascatie">
                        <Form.Label>Id Frascati *</Form.Label>
                        <Form.Control
                            name="idfrascati"
                            value={frascatis.idfrascati}
                            readOnly // Empêche la modification manuelle
                        />
                    </Form.Group>

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
                            value={frascatis.refgrdiscip} // Affiche uniquement la partie entière
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridOrdre">
                        <Form.Label>Ordre *</Form.Label>
                        <Form.Control
                            type="text"
                            name="ordre"
                            value={frascatis.ordre} // Affiche uniquement la partie décimale
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>

                <div className="col-md-3 text-right">
                    <hr />
                    <p>* Information requise</p>
                    <Button variant="primary" className="btn-custom" type="submit">
                        Envoyer
                    </Button>
                    <Button variant="secondary" className="btn-custom" onClick={() => handleNavigation("/frascati")}>
                        Annuler
                    </Button>
                </div>
            </Form>

            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    Le Frascati a été ajouté avec succès.
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

export default FrascatiAjouter;
