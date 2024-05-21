import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";

function ProjetAjouter() {
    const { getAccessTokenSilently } = useAuth0();
    const [projet, setProjet] = useState({
        idprojet: "",
        nom: "",
        nomUK: "",
        nomprogramme: "",
        nomprogrammeUK: "",
        resume: "",
        resumeUK: "",
        datedebut: new Date().toISOString().substr(0, 10),
        datefin: new Date().toISOString().substr(0, 10),
        datemaj: new Date().toISOString().substr(0, 10),
        ordre: "",
        site: "",
        dDebut: "",
        dFin: "",
        fromCv: "0",
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProjet({ ...projet, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);
        setError("");

        const accessToken = await getAccessTokenSilently();

        try {
            const response = await axios.post(`/api/zprojet/ajouter`, projet, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log("Projet créé avec succès");
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 3000);
            } else {
                console.error("Erreur lors de la création du projet");
            }
        } catch (error) {
            console.error("Erreur lors de la création du projet : ", error);
            setError("Une erreur s'est produite lors de la création du projet.");
        }
    };

    return (
        <>
            <h2>Ajouter nouveau Projet :</h2>
            <Form onSubmit={handleFormSubmit}>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridIdProjet">
                        <Form.Label>ID Projet *</Form.Label>
                        <Form.Control
                            type="text"
                            name="idprojet"
                            value={projet.idprojet}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNom">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={projet.nom}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,255}$"
                            title="Le nom ne peut pas contenir des chiffres (255 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNomUK">
                        <Form.Label>Nom UK</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomUK"
                            value={projet.nomUK}
                            onChange={handleChange}

                            pattern="^[A-Za-zÀ-ÿ\s]{1,255}$"
                            title="Le nom UK ne peut pas contenir des chiffres (255 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNomProgramme">
                        <Form.Label>Nom Programme *</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomprogramme"
                            value={projet.nomprogramme}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,100}$"
                            title="Le nom du programme ne peut pas contenir des chiffres (100 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNomProgrammeUK">
                        <Form.Label>Nom Programme UK *</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomprogrammeUK"
                            value={projet.nomprogrammeUK}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,100}$"
                            title="Le nom du programme UK ne peut pas contenir des chiffres (100 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridResume">
                        <Form.Label>Résumé *</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="resume"
                            value={projet.resume}
                            onChange={handleChange}
                            required
                            maxLength="2500"
                            title="Le résumé ne peut pas contenir plus de 2500 caractères"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridResumeUK">
                        <Form.Label>Résumé UK *</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="resumeUK"
                            value={projet.resumeUK}
                            onChange={handleChange}
                            required
                            maxLength="2500"
                            title="Le résumé UK ne peut pas contenir plus de 2500 caractères"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDateDebut">
                        <Form.Label>Date de Début *</Form.Label>
                        <Form.Control
                            type="date"
                            name="datedebut"
                            value={projet.datedebut}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDateFin">
                        <Form.Label>Date de Fin *</Form.Label>
                        <Form.Control
                            type="date"
                            name="datefin"
                            value={projet.datefin}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDateMaj">
                        <Form.Label>Date de Mise à Jour *</Form.Label>
                        <Form.Control
                            type="date"
                            name="datemaj"
                            value={projet.datemaj}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridOrdre">
                        <Form.Label>Ordre *</Form.Label>
                        <Form.Control
                            type="number"
                            name="ordre"
                            value={projet.ordre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSite">
                        <Form.Label>Site *</Form.Label>
                        <Form.Control
                            type="text"
                            name="site"
                            value={projet.site}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,255}$"
                            title="Le site ne peut pas contenir des chiffres (255 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDDebut">
                        <Form.Label>D Début *</Form.Label>
                        <Form.Control
                            type="text"
                            name="dDebut"
                            value={projet.dDebut}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,100}$"
                            title="Le D Début ne peut pas contenir des chiffres (100 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDFin">
                        <Form.Label>D Fin *</Form.Label>
                        <Form.Control
                            type="text"
                            name="dFin"
                            value={projet.dFin}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,100}$"
                            title="Le D Fin ne peut pas contenir des chiffres (100 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFromCv">
                        <Form.Label>From CV *</Form.Label>
                        <Form.Control
                            type="text"
                            name="fromCv"
                            value={projet.fromCv}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-z0-9\s]{1,25}$"
                            title="Le From CV doit contenir des lettres et chiffres (25 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <div>
                    <hr />
                    <p>* Information requise</p>
                </div>

                <div className="btn">
                    <Button variant="primary" type="submit">
                        Envoyer
                    </Button>
                </div>

            </Form>

            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    Le projet a été ajouté avec succès.
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

export default ProjetAjouter;
