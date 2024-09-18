import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProjetModifier() {
    const { getAccessTokenSilently } = useAuth0();
    const { idprojet } = useParams();
    const [projet, setProjet] = useState({
        nom: "",
        nomUK: "",
        nomprogramme: "",
        nomprogrammeUK: "",
        resume: "",
        resumeUK: "",
        datedebut: "",
        datefin: "",
        datemaj: "",
        ordre: "",
        site: "",
        dDebut: "",
        dFin: "",
        fromCv: "",
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProjet = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zprojet/${idprojet}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setProjet(response.data);
                } else {
                    console.error("Erreur lors de la récupération du projet");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du projet : ", error);
            }
        };
        fetchProjet();
    }, [idprojet, getAccessTokenSilently]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProjet({ ...projet, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);
        setError("");

        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.put(`/api/zprojet/${idprojet}`, projet, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log("Projet modifié avec succès");
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 2500);

                setTimeout(() => {
                    handleNavigation(`/projetDetail/${idprojet}`);
                }, 2000);

            } else {
                console.error("Erreur lors de la modification du projet");
                setError("Une erreur s'est produite lors de la modification du projet.");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du projet: ", error);
            setError("Une erreur s'est produite lors de la modification du projet.");
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <h2>Modifier un Projet :</h2>
            <Form onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNom">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={projet.nom}
                            onChange={handleChange}
                            required
                           /* pattern="^[A-Za-zÀ-ÿ\s]{1,255}$"
                            title="Le nom ne peut pas contenir des chiffres (255 caractères max)"*/
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNomUK">
                        <Form.Label>Nom UK</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomUK"
                            value={projet.nomUK}
                            onChange={handleChange}
                            /*pattern="^[A-Za-zÀ-ÿ\s]{1,255}$"
                            title="Le nom UK ne peut pas contenir des chiffres (255 caractères max)"*/
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
                            /*pattern="^[A-Za-zÀ-ÿ\s]{1,100}$"
                            title="Le nom du programme ne peut pas contenir des chiffres (100 caractères max)" */
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
                           /* pattern="^[A-Za-zÀ-ÿ\s]{1,100}$"
                            title="Le nom du programme UK ne peut pas contenir des chiffres (100 caractères max)" */
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
                           /* maxLength="2500"
                            title="Le résumé ne peut pas contenir plus de 2500 caractères"*/
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
                           /* maxLength="2500"
                            title="Le résumé UK ne peut pas contenir plus de 2500 caractères"*/
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
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDFin">
                        <Form.Label>D Fin</Form.Label>
                        <Form.Control
                            type="text"
                            name="dFin"
                            value={projet.dFin}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFromCv">
                        <Form.Label>From CV</Form.Label>
                        <Form.Control
                            type="text"
                            name="fromCv"
                            value={projet.fromCv}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                {error && <Alert variant="danger">{error}</Alert>}
                {showNotif && <Alert variant="success">Projet modifié avec succès!</Alert>}


                <div className="col-md-3 text-right">
                    <hr />
                    <p>* Information requise</p>
                    <Button variant="primary" className="btn-custom" type="submit">
                        Confirmer
                    </Button>
                    <Button variant="secondary" className="btn-custom" onClick={() => handleNavigation(`/projetDetail/${idprojet}`)}>
                        Annuler
                    </Button>
                </div>

            </Form>
        </>
    );
}

export default ProjetModifier;
