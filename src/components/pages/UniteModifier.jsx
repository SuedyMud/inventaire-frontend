import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UniteModifier() {
    const { getAccessTokenSilently } = useAuth0();
    const { idunite } = useParams();
    const [unite, setUnite] = useState({
        nom: "",
        nomUK: "",
        description: "",
        descriptionUK: "",
        rue: "",
        numero: "",
        boite: "",
        localite: "",
        codepostal: "",
        cpi: "",
        localisation: "",
        telephone: "",
        fax: "",
        email: "",
        site1: "",
        site2: ""
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUnite = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zunite/${idunite}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setUnite(response.data);
                } else {
                    console.error("Erreur lors de la récupération de l'unité");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'unité : ", error);
            }
        };
        fetchUnite();
    }, [idunite, getAccessTokenSilently]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUnite({ ...unite, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);
        setError("");

        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.put(`/api/zunite/${idunite}`, unite, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log("Unité modifiée avec succès");
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 3000);

                setTimeout(() => {
                    navigate("/unite");
                }, 1000);
            } else {
                console.error("Erreur lors de la modification de l'unité");
                setError("Une erreur s'est produite lors de la modification de l'unité.");
            }
        } catch (error) {
            console.error("Erreur lors de la modification de l'unité: ", error);
            setError("Une erreur s'est produite lors de la modification de l'unité.");
        }
    };

    return (
        <>
            <h2>Modifier une unité :</h2>
            <Form onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNom">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={unite.nom}
                            onChange={handleChange}
                            required

                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNomUK">
                        <Form.Label>Nom UK</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomUK"
                            value={unite.nomUK}
                            onChange={handleChange}

                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={unite.description}
                            onChange={handleChange}
                            rows={3}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDescriptionUK">
                        <Form.Label>Description UK</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descriptionUK"
                            value={unite.descriptionUK}
                            onChange={handleChange}
                            rows={3}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridRue">
                        <Form.Label>Rue</Form.Label>
                        <Form.Control
                            type="text"
                            name="rue"
                            value={unite.rue}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNumero">
                        <Form.Label>Numéro</Form.Label>
                        <Form.Control
                            type="text"
                            name="numero"
                            value={unite.numero}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBoite">
                        <Form.Label>Boîte</Form.Label>
                        <Form.Control
                            type="text"
                            name="boite"
                            value={unite.boite}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridLocalite">
                        <Form.Label>Localité</Form.Label>
                        <Form.Control
                            type="text"
                            name="localite"
                            value={unite.localite}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCodePostal">
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control
                            type="text"
                            name="codepostal"
                            value={unite.codepostal}
                            onChange={handleChange}
                            pattern="^\d{4,5}$"
                            title="Le code postal doit contenir 4 ou 5 chiffres"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCpi">
                        <Form.Label>CPI (Code Postal Interne)</Form.Label>
                        <Form.Control
                            type="text"
                            name="cpi"
                            value={unite.cpi}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridLocalisation">
                        <Form.Label>Localisation</Form.Label>
                        <Form.Control
                            type="text"
                            name="localisation"
                            value={unite.localisation}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTelephone">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                            type="text"
                            name="telephone"
                            value={unite.telephone}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFax">
                        <Form.Label>Fax</Form.Label>
                        <Form.Control
                            type="text"
                            name="fax"
                            value={unite.fax}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={unite.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSite1">
                        <Form.Label>Site Web 1</Form.Label>
                        <Form.Control
                            type="text"
                            name="site1"
                            value={unite.site1}
                            onChange={handleChange}
                            pattern="^(https?://)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(/.*)?$"
                            title="L'URL doit être au format http://, https://, ou www."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSite2">
                        <Form.Label>Site Web 2</Form.Label>
                        <Form.Control
                            type="text"
                            name="site2"
                            value={unite.site2}
                            onChange={handleChange}
                            pattern="^(https?://)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(/.*)?$"
                            title="L'URL doit être au format http://, https://, ou www."
                        />
                    </Form.Group>
                </Row>

                {error && <Alert variant="danger">{error}</Alert>}
                {showNotif && <Alert variant="success">Unité modifiée avec succès!</Alert>}

                <Button variant="primary" type="submit">
                    Modifier
                </Button>
            </Form>
        </>
    );
}

export default UniteModifier;
