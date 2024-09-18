import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {Form, Button, Alert, Row, Col} from "react-bootstrap";

function ChercheurModifier() {
    const { getAccessTokenSilently } = useAuth0();
    const { idche } = useParams();
    const [chercheur, setChercheur] = useState({
        nom: "",
        prenom: "",
        telephone: "",
        cpi: "",
        site: "",
        email: "",
        campus: ""
    });

    const [showNotif, setShowNotif] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChercheur = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zchercheur/${idche}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setChercheur(response.data);
                } else {
                    console.error("Erreur lors de la récupération du chercheur");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du chercheur : ", error);
            }
        };
        fetchChercheur();
    }, [idche, getAccessTokenSilently]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChercheur({ ...chercheur, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);

        const accessToken = await getAccessTokenSilently();

        try {
            const response = await axios.put(`/api/zchercheur/${idche}`, chercheur, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log("Chercheur modifié avec succès");
                setShowNotif(true);
                setTimeout(() => {
                    navigate(`/chercheurDetail/${idche}`);
                }, 1000); // 900 -1 secondes de délai avant la redirection
            } else {
                console.error("Erreur lors de la modification du chercheur");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du chercheur : ", error);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <h2>Modifier Chercheur :</h2>
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
                            /*pattern="^[A-Za-zÀ-ÿ\s]{1,25}$"
                            title = "Le nom ne peut pas contenir des chiffres (25 caractères)"*/
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
                           /* pattern="^[A-Za-zÀ-ÿ\s]{1,25}$"
                            title = "Le prénom ne peut pas contenir des chiffres (25 caractères)"*/
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTelephone">
                        <Form.Label>Téléphone *</Form.Label>
                        <Form.Control
                            type="text"
                            name="telephone"
                            value={chercheur.telephone}
                            onChange={handleChange}
                            required
                           /* pattern="^\+\d{2} \d{9}$"
                            title="Le numéro de téléphone doit être au format +32 4XXXXXXX"*/
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={chercheur.email}
                            onChange={handleChange}
                            required
                           /* pattern= "^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\\.[A-Za-z0-9.-]+$"
                            title = "L'adresse e-mail n'est pas au format valide"*/
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

                           /* pattern="^[0-9\s]{1,8}$"
                            title="Le CPI doit contenir que des chiffres (8 caractères max)"*/
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSite">
                        <Form.Label>Site web</Form.Label>
                        <Form.Control
                            type="text"
                            name="site"
                            value={chercheur.site}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>



               {/* <Form.Group controlId="campus">
                    <Form.Label>Campus :</Form.Label>
                    <Form.Control
                        type="text"
                        name="campus"
                        value={chercheur.campus}
                        onChange={handleChange}
                    />
                </Form.Group>
*/}


                <div className="col-md-3 text-right">
                    <hr />
                    <p>* Information requise</p>
                    <Button variant="primary" className="btn-custom"type="submit">
                        Confirmer
                    </Button>
                    <Button variant="secondary" className="btn-custom" onClick={() => handleNavigation(`/chercheurDetail/${idche}`)}>
                        Annuler
                    </Button>
                </div>



            </Form>
            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    Le chercheur a été modifié avec succès.
                </Alert>
            )}
        </div>
    );
}

export default ChercheurModifier;
