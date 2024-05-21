import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {Form, Button, Alert, Col, Row} from "react-bootstrap";

function ChercheurAjouter() {
    const { getAccessTokenSilently } = useAuth0();
    const [chercheur, setChercheur] = useState({
        nom: "",
        prenom: "",
        titre: "",
        matricule: "",
        cpi: "",
        telephone: "",
        email: "",
        fax: "",
        site: "",
        corps: "",
        corpsOrdre: "",
        dDig: new Date().toISOString().substr(0, 10),
        facChe: "",
        prefPublication: ""
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChercheur({ ...chercheur, [name]: value });
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);
        setError("");

        const accessToken = await getAccessTokenSilently();

        try {
            const response = await axios.post(`/api/zchercheur/ajouter`, chercheur, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log("Chercheur créé avec succès");
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 3000);
            } else {
                console.error("Erreur lors de la création du chercheur");
            }
        } catch (error) {
            console.error("Erreur lors de la création du chercheur : ", error);
            setError("Une erreur s'est produite lors de la création du chercheur.");
        }
    };

    return (
        <>
            <h2>Ajouter nouveau Chercheur :</h2>
            <Form onSubmit={handleFormSubmit}>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNom">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={chercheur.nom}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,25}$"
                            title = "Le nom ne peut pas contenir des chiffres (25 caractères)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPrenom">
                        <Form.Label>Prénom *</Form.Label>
                        <Form.Control
                            type="text"
                            name="prenom"
                            value={chercheur.prenom}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,25}$"
                            title = "Le prénom ne peut pas contenir des chiffres (25 caractères)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTitre">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control
                            type="text"
                            name="titre"
                            value={chercheur.titre}
                            onChange={handleChange}

                            pattern="^[A-Za-zÀ-ÿ\s]{1,25}$"
                            title = "Le titre ne peut pas contenir des chiffres (25 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMatricule">
                        <Form.Label>Matricule</Form.Label>
                        <Form.Control
                            type="text"
                            name="matricule"
                            value={chercheur.matricule}
                            onChange={handleChange}

                            pattern="^[A-Za-z0-9\s]{1,25}$"
                            title="Le matricule doit contenir des lettres et chiffres (25 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCpi">
                        <Form.Label>CPI (code postal interne)</Form.Label>
                        <Form.Control
                            type="text"
                            name="cpi"
                            value={chercheur.cpi}
                            onChange={handleChange}

                            pattern="^[0-9\s]{1,8}$"
                            title="Le CPI doit contenir que des chiffres (8 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTelephone">
                        <Form.Label>Téléphone *</Form.Label>
                        <Form.Control
                            type="text"
                            name="telephone"
                            value={chercheur.telephone}
                            onChange={handleChange}
                            required
                            pattern="^\+\d{2} \d{9}$"
                            title="Le numéro de téléphone doit être au format +32 4XXXXXXX"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={chercheur.email}
                            onChange={handleChange}
                            required
                            pattern= "^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\\.[A-Za-z0-9.-]+$"
                            title = "L'adresse e-mail n'est pas au format valide"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFax">
                        <Form.Label>Fax</Form.Label>
                        <Form.Control
                            type="text"
                            name="fax"
                            value={chercheur.fax}
                            onChange={handleChange}

                            pattern="^\+\d{2} \d{9}$"
                            title="Le numéro de téléphone doit être au format +32 4XXXXXXX"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridSite">
                        <Form.Label>Site web</Form.Label>
                        <Form.Control
                            type="text"
                            name="site"
                            value={chercheur.site}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCorps">
                        <Form.Label>Corps</Form.Label>
                        <Form.Select
                            name="corps"
                            value={chercheur.corps}
                            onChange={handleChange}
                        >
                            <option value="Acad.">Acad.</option>
                            <option value="Patgs">Patgs</option>
                            <option value=""></option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridCorpsOrdre">
                        <Form.Label>Corps Ordre</Form.Label>
                        <Form.Control
                            type="number"
                            name="corpsOrdre"
                            value={chercheur.corpsOrdre}
                            onChange={handleChange}

                            /*pattern="^\+\d{2} \d{9}$"
                            title="Le numéro de téléphone doit être au format +32 4XXXXXXX"*/
                        />

                        {/*<Form.Select
                            name="corpsOrdre"
                            value={chercheur.corpsOrdre}
                            onChange={handleChange}
                        >
                            <option value="admin">0</option>
                            <option value="utilsateur">1</option>

                        </Form.Select>*/}
                    </Form.Group>

                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDDig">
                        <Form.Label>Date d'inscription</Form.Label>
                        <Form.Control
                            type="date"
                            name="dDig"
                            value={chercheur.dDig}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridFacChe">
                        <Form.Label>Faculté Chercheur</Form.Label>
                        <Form.Select
                            name="facChe"
                            value={chercheur.facChe}
                            onChange={handleChange}
                        >
                            <option value=""></option>


                        </Form.Select>

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrefPublication">
                        <Form.Label>Préférence de Publication</Form.Label>
                        <Form.Select
                            name="prefPublication"
                            value={chercheur.prefPublication}
                            onChange={handleChange}
                        >
                            <option value="integree">integree</option>


                        </Form.Select>
                    </Form.Group>
                </Row>

                <div>
                    <hr />
                    <p>* Information requis</p>
                </div>

                <div className="btn">
                    <Button variant="primary" type="submit">
                        Envoyer
                    </Button>
                </div>

            </Form>

            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    Le chercheur a été ajouter avec succès.
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

export default ChercheurAjouter;
