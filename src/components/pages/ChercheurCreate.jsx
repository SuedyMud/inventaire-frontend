import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {Form, Button, Alert, Col, Row} from "react-bootstrap";

function ChercheurCreate() {
    const { getAccessTokenSilently } = useAuth0();
    const [chercheur, setChercheur] = useState({
        nom: "",
        prenom: "",
        titre: "",
        matricule: "",
        CPI: "",
        telephone: "",
        email: "",
        fax: "",
        site: "",
        corps: "",
        corpsOrdre: "",
        DDig: new Date().toISOString().substr(0, 10),
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
        <div>
            <h2>Ajouter nouveau Chercheur :</h2>
            <Form onSubmit={handleFormSubmit}>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={chercheur.nom}
                            placeholder="Enter nom"
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s]{1,25}$"
                            title = "Le nom ne peut pas contenir des chiffres (25 caractères)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPrenom">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            name="prenom"
                            placeholder="Enter prénom"
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
                            placeholder="Enter titre"
                            onChange={handleChange}
                            required
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
                            placeholder="Enter matricule"
                            onChange={handleChange}
                            /*required
                            pattern= "^[A-Za-zÀ-ÿ\\s]{1,}$"
                            title = "25 caractères max"*/
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCPI">
                        <Form.Label>CPI</Form.Label>
                        <Form.Control
                            type="text"
                            name="CPI"
                            value={chercheur.CPI}
                            placeholder="Enter CPI"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTelephone">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                            type="text"
                            name="telephone"
                            value={chercheur.telephone}
                            placeholder="Enter telephone"
                            onChange={handleChange}
                            required
                            pattern="^\+\d{2} \d{9}$"
                            title="Le numéro de téléphone doit être au format +32 4XXXXXXX"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={chercheur.email}
                            placeholder="Enter email"
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
                            name="Fax"
                            value={chercheur.Fax}
                            placeholder="Enter fax"
                            onChange={handleChange}
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
                            placeholder="Enter site web"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCorps">
                        <Form.Label>Corps</Form.Label>
                        <Form.Select
                            name="corps"
                            value={chercheur.corps}
                            onChange={handleChange}
                            required
                        >
                            <option value="admin">Acad.</option>
                            <option value="utilsateur">Patgs</option>
                            <option value="visiteur"> </option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridCorpsOrdre">
                        <Form.Label>Corps Ordre</Form.Label>
                        <Form.Select
                            name="corps"
                            value={chercheur.corpsOrdre}
                            onChange={handleChange}
                            required
                        >
                            <option value="admin">A</option>
                            <option value="admin">B</option>
                            <option value="utilsateur">U</option>
                            <option value="visiteur">V</option>
                        </Form.Select>
                    </Form.Group>

                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDdig">
                        <Form.Label>Date d'inscription</Form.Label>
                        <Form.Control
                            type="date"
                            name="DDig"
                            value={chercheur.DDig}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridFacChe">
                        <Form.Label>Faculté Chercheur</Form.Label>
                        <Form.Control
                            type="text"
                            name="facChe"
                            value={chercheur.facChe}
                            placeholder="Enter faculté chercheur"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrefPublication">
                        <Form.Label>Préférence de Publication</Form.Label>
                        <Form.Control
                            type="text"
                            name="prefPublication"
                            value={chercheur.prefPublication}
                            placeholder="Enter préférence de publication"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>



                <div className="btn">
                    <Button variant="primary" type="submit">
                        Envoyer
                    </Button>
                </div>

            </Form>
            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    Le chercheur a été créé avec succès.
                </Alert>
            )}
            {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                    {error}
                </Alert>
            )}
        </div>
    );
}

export default ChercheurCreate;
