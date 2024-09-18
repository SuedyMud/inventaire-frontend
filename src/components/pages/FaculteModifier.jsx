import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function FaculteModifier() {
    const { getAccessTokenSilently } = useAuth0();
    const { fac } = useParams(); // On utilise l'ID (lié à Frascati) pour récupérer les informations de la faculté
    const [faculte, setFaculte] = useState({
        faculte: "",
        faculteUK: "",
        sigle: "",
        dMaj: "",
        cc: "",
        infofin: "",
        idFac: "",
        actif: false,
        groupe: "",
        invent20: "",
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fonction pour récupérer les données de la faculté
    useEffect(() => {
        const fetchFaculte = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zfac/${fac}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setFaculte(response.data);
                } else {
                    console.error("Erreur lors de la récupération de la faculté");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la faculté : ", error);
            }
        };
        fetchFaculte();
    }, [fac, getAccessTokenSilently]);

    // Fonction pour mettre à jour les champs de formulaire
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFaculte({ ...faculte, [name]: type === 'checkbox' ? checked : value });
    };

    // Fonction pour envoyer les modifications au backend
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);
        setError("");

        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.put(`/api/zfac/${fac}`, faculte, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log("Faculté modifiée avec succès");
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 2500);

                // Redirection vers les détails de la faculté après modification
                setTimeout(() => {
                    handleNavigation(`/faculteDetail/${fac}`);
                }, 2000);
            } else {
                console.error("Erreur lors de la modification de la faculté");
                setError("Une erreur s'est produite lors de la modification de la faculté.");
            }

        } catch (error) {
            console.error("Erreur lors de la modification de la faculté : ", error);
            setError("Une erreur s'est produite lors de la modification de la faculté.");
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <h2>Modifier une Faculté :</h2>
            <Form onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFaculte">
                        <Form.Label>Nom Faculté *</Form.Label>
                        <Form.Control
                            type="text"
                            name="faculte"
                            value={faculte.faculte}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFaculteUK">
                        <Form.Label>Nom UK</Form.Label>
                        <Form.Control
                            type="text"
                            name="faculteUK"
                            value={faculte.faculteUK}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridSigle">
                        <Form.Label>Sigle</Form.Label>
                        <Form.Control
                            type="text"
                            name="sigle"
                            value={faculte.sigle}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCc">
                        <Form.Label>Code Comptabilité</Form.Label>
                        <Form.Control
                            type="text"
                            name="cc"
                            value={faculte.cc}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridIdFac">
                        <Form.Label>ID Faculté *</Form.Label>
                        <Form.Control
                            type="text"
                            name="idFac"
                            value={faculte.idFac}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGroupe">
                        <Form.Label>Groupe</Form.Label>
                        <Form.Control
                            type="text"
                            name="groupe"
                            value={faculte.groupe}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Form.Group controlId="formGridActif" className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Actif"
                        name="actif"
                        checked={faculte.actif}
                        onChange={handleChange}
                    />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                {showNotif && <Alert variant="success">Faculté modifiée avec succès!</Alert>}
                <hr />
                <p>* Information requise</p>
                <div className="col-md-3 text-right">
                    <Button variant="primary" className="btn-custom" type="submit" >
                        Confirmer
                    </Button>
                    <Button variant="secondary" className="btn-custom" onClick={() => handleNavigation(`/faculteDetail/${fac}`)}>
                        Annuler
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default FaculteModifier;
