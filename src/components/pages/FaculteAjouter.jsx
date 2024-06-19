import { useAuth0 } from "@auth0/auth0-react";
import {Alert, Button, Col, Form, ListGroup, Row} from "react-bootstrap";
import {useQuery} from "react-query";
import {getFaculte} from "../../utils/ApiGet.js";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";


function FaculteAjouter() {
    const { getAccessTokenSilently } = useAuth0();
    const [faculte, setFaculte] = useState({
        fac: "",
        faculte: "",
        faculteUK: "",
        sigle: "",
        dMaj: new Date().toISOString().substr(0, 10),
        cc: "",
        infofin: "",
        idFac: "",
        actif: "",
        groupe: "",
        invent20: ""
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFaculte({ ...faculte, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);
        setError("");

        const accessToken = await getAccessTokenSilently();

        try {
            const response = await axios.post(`/api/zfac/ajouter`, faculte, {
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
            <h2>Ajouter nouvelle faculté:</h2>
            <Form onSubmit={handleFormSubmit}>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFac">
                        <Form.Label>Fac *</Form.Label>
                        <Form.Control
                            type="text"
                            name="fac"
                            value={faculte.fac}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,11}$"
                            title="Le fac ne peut pas contenir des chiffres (11 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFaculte">
                        <Form.Label>Faculté</Form.Label>
                        <Form.Control
                            type="text"
                            name="faculte"
                            value={faculte.faculte}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s]{1,70}$"
                            title="La faculté ne peut pas contenir des chiffres (70 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFaculteUK">
                        <Form.Label>Faculté UK *</Form.Label>
                        <Form.Control
                            type="text"
                            name="faculteUK"
                            value={faculte.faculteUK}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,70}$"
                            title="La faculté UK ne peut pas contenir des chiffres (70 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSigle">
                        <Form.Label>Sigle *</Form.Label>
                        <Form.Control
                            type="text"
                            name="sigle"
                            value={faculte.sigle}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-z0-9\s]{1,16}$"
                            title="Le sigle doit contenir des lettres et chiffres (16 caractères max)"
                        />
                    </Form.Group>

                    {/*<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
*/}
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDMaj">
                        <Form.Label>Date de Mise à Jour *</Form.Label>
                        <Form.Control
                            type="date"
                            name="dMaj"
                            value={faculte.dMaj}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCC">
                        <Form.Label>CC *</Form.Label>
                        <Form.Control
                            type="text"
                            name="cc"
                            value={faculte.cc}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-z0-9\s]{1,10}$"
                            title="Le CC doit contenir des lettres et chiffres (10 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridInfofin">
                        <Form.Label>Infofin *</Form.Label>
                        <Form.Control
                            type="number"
                            name="infofin"
                            value={faculte.infofin}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridIdFac">
                        <Form.Label>ID Fac *</Form.Label>
                        <Form.Control
                            type="number"
                            name="idFac"
                            value={faculte.idFac}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridActif">
                        <Form.Label>Actif *</Form.Label>
                        <Form.Control
                            type="number"
                            name="actif"
                            value={faculte.actif}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGroupe">
                        <Form.Label>Groupe *</Form.Label>
                        <Form.Control
                            type="text"
                            name="groupe"
                            value={faculte.groupe}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,20}$"
                            title="Le groupe ne peut pas contenir des chiffres (20 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridInvent20">
                        <Form.Label>Invent20 *</Form.Label>
                        <Form.Control
                            type="number"
                            name="invent20"
                            value={faculte.invent20}
                            onChange={handleChange}
                            required
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

export default FaculteAjouter;
