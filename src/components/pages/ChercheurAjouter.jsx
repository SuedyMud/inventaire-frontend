import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        corpsOrdre: 0,
        dDig: new Date().toISOString().substr(0, 10),
        facChe: "",
        prefPublication: "integree"
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fonction pour générer un matricule aléatoire à 8 chiffres
    const generateMatricule = () => {
        return Math.floor(10000000 + Math.random() * 90000000); // Génère un nombre entre 10000000 et 99999999
    };

    // Initialiser le matricule lors du montage du composant
    useEffect(() => {
        setChercheur(prevChercheur => ({
            ...prevChercheur,
            matricule: generateMatricule() // Matricule généré automatiquement
        }));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChercheur({ ...chercheur, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.post(`/api/zchercheur/ajouter`, chercheur, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 201) {
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 2000);

                setTimeout(() => {
                    navigate("/chercheur");
                }, 1000);

            } else {
                setError("Erreur lors de la création du chercheur.");
            }
        } catch (error) {
            setError("Erreur lors de la création du chercheur : " + error.message);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
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
                            pattern="^[A-Za-zÀ-ÿ\s'’.,\-]{1,25}$"
                            title="Le nom ne peut pas contenir des chiffres (25 caractères max)"
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
                            pattern="^[A-Za-zÀ-ÿ\s'’.,\-]{1,25}$"
                            title="Le prénom ne peut pas contenir des chiffres (25 caractères max)"
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
                            pattern="^[A-Za-zÀ-ÿ\s'’.,\-]{1,25}"
                            title="Le titre ne peut pas contenir des chiffres (25 caractères max)"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMatricule">
                        <Form.Label>Matricule</Form.Label>
                        <Form.Control
                            type="text"
                            name="matricule"
                            value={chercheur.matricule}
                            readOnly // Matricule généré automatiquement, pas modifiable
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
                            pattern="^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                            title="E-mail invalide"
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
                            pattern="^(https?://)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(/.*)?$"
                            title="L'URL doit être au format http://, https://, ou www."
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
                            <option value="">Sélectionnez un corps</option>
                            <option value="Acad.">Acad.</option>
                            <option value="Patgs">Patgs</option>
                            <option value=""></option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCorpsOrdre">
                        <Form.Label>Corps Ordre</Form.Label>
                        <Form.Control
                            type="text"
                            name="corpsOrdre"
                            value={chercheur.corpsOrdre}
                            onChange={handleChange}
                            pattern="^[0-9]{1,11}$"
                            title="statAnciensmembres : chiffre seulement, 11 caractères max."
                        />
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
                    {/*<Form.Group as={Col} controlId="formGridFacChe">
                        <Form.Label>Faculté du chercheur</Form.Label>
                        <Form.Control
                            type="text"
                            name="facChe"
                            value={chercheur.facChe}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,50}$"
                            title="facChe : lettres seulement, 50 caractères max."
                        >
                        </Form.Control>

                    </Form.Group>*/}


                    <Form.Group as={Col} controlId="formGridFacChe">
                    <Form.Label>Faculté du chercheur</Form.Label>
                        <Form.Select
                            name="facChe"
                            value={chercheur.facChe}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionnez un facChe</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                            <option value="GD">GD</option>
                            <option value="GE">GE</option>
                            <option value="H">H</option>
                            <option value="I">I</option>
                            <option value="J">J</option>
                            <option value="K">K</option>
                            <option value="KB">KB</option>
                            <option value="KC">KC</option>
                            <option value="KD">KD</option>
                            <option value="KE">KE</option>
                            <option value="L">L</option>
                            <option value="L">L</option>
                            <option value="L">L</option>
                            <option value="G">G</option>
                            <option value="GD">GD</option>
                            <option value="GE">GE</option>

                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPrefPublication">
                        <Form.Label>Préférence de Publication</Form.Label>
                        <Form.Control
                            type="text"
                            name="prefPublication"
                            value={chercheur.prefPublication}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,5000}$"
                            title="prefPublication : lettres seulement, 5000 caractères max."
                        >
                        </Form.Control>
                    </Form.Group>
                </Row>


                <div className="col-md-3 text-right">
                    <hr />
                    <p>* Information requise</p>
                    <Button variant="primary" className="btn-custom" type="submit">
                        Envoyer
                    </Button>
                    <Button variant="secondary" className="btn-custom" onClick={() => handleNavigation("/chercheur")}>
                        Annuler
                    </Button>
                </div>
            </Form>

            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    Le chercheur a été ajouté avec succès.
                </Alert>
            )}
            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}
        </>
    );
}

export default ChercheurAjouter;

/*
import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        corpsOrdre: 0,
        dDig: new Date().toISOString().substr(0, 10),
        facChe: "",
        prefPublication: "integree"
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChercheur({ ...chercheur, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.post(`/api/zchercheur/ajouter`, chercheur, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 201) {
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 2000);

                setTimeout(() => {
                    navigate("/chercheur");
                }, 1000);

            } else {
                setError("Erreur lors de la création du chercheur.");
            }
        } catch (error) {
            setError("Erreur lors de la création du chercheur : " + error.message);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
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
                            pattern="^[A-Za-zÀ-ÿ\s'’.,\-]{1,25}$"
                            title="Le nom ne peut pas contenir des chiffres (25 caractères max)"
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
                            pattern="^[A-Za-zÀ-ÿ\s'’.,\-]{1,25}$"
                            title="Le prénom ne peut pas contenir des chiffres (25 caractères max)"
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
                            pattern="^[A-Za-zÀ-ÿ\s'’.,\-]{1,25}"
                            title="Le titre ne peut pas contenir des chiffres (25 caractères max)"
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
                            pattern="^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                            title="E-mail invalide"
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
                            pattern="^(https?://)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(/.*)?$"
                            title="L'URL doit être au format http://, https://, ou www."
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
                            type="text"
                            name="corpsOrdre"
                            value={chercheur.corpsOrdre}
                            onChange={handleChange}
                            pattern="^[0-9]{1,11}$"
                            title="statAnciensmembres : chiffre seulement, 11 caractères max."
                        />
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
                        <Form.Label>Faculté du chercheur</Form.Label>
                        <Form.Control
                            type="text"
                            name="facChe"
                            value={chercheur.facChe}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,50}$"
                            title="facChe : lettres seulement, 50 caractères max."
                        >
                        </Form.Control>

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrefPublication">
                        <Form.Label>Préférence de Publication</Form.Label>
                        <Form.Control
                            type="text"
                            name="prefPublication"
                            value={chercheur.prefPublication}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,5000}$"
                            title="prefPublication : lettres seulement, 5000 caractères max."
                        >
                        </Form.Control>
                    </Form.Group>
                </Row>



                <div className="col-md-3 text-right"> {/!* Colonne prenant 3/12 de la largeur et alignée à droite *!/}
                    <hr />
                    <p>* Information requise</p>
                    <Button variant="primary" className="btn-custom" type="submit">
                        Envoyer
                    </Button>
                    <Button variant="secondary" className="btn-custom" onClick={() => handleNavigation("/chercheur")}>
                        Annuler
                    </Button>
                </div>


            </Form>

            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    Le chercheur a été ajouté avec succès.
                </Alert>
            )}
            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}
        </>
    );
}

export default ChercheurAjouter;

*/