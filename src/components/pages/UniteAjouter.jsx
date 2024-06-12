import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UniteAjouter() {
    const { getAccessTokenSilently } = useAuth0();
    const [unite, setUnite] = useState({
       /* idunite: "ULB",*/
        istrans: 0,
        preflang: "",
        nom: "",
        nomUK: "",
        sigle: "",
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
        site2: "",
        lienthese: "",
        lienpublica: "",
        datedeb: "",
        datefin: "",
        datemaj: "",
        remarque: "",
        nbvisit: 0,
        brouillon: "",
        prefPublication: "integree",
        statExport: 0,
        statProjetcv: 0,
        statAnciensmembres: 0,
        statDelegue: 0,
        statAdzion: 0,
        niveau: ""
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUnite({ ...unite, [name]: value });
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const validateDates = () => {
        const today = new Date().toISOString().split('T')[0];
        const { datedeb, datefin, datemaj } = unite;

        if (datedeb && datedeb < today) {
            setError("La date de début ne peut pas être antérieure à aujourd'hui.");
            return false;
        }

        if (datedeb && datefin && datedeb > datefin) {
            setError("La date de début ne peut pas être supérieure à la date de fin.");
            return false;
        }

        if (datemaj && datemaj < datefin) {
            setError("La date de mise à jour ne peut pas être antérieure à la date de fin.");
            return false;
        }

        return true;
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowNotif(false);
        setError("");

        if (!validateDates()) {
            return;
        }

        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.post(`/api/zunite/ajouter`, unite, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 201) {
                console.log("Unite créé avec succès");
                setShowNotif(true);
                setTimeout(() => setShowNotif(false), 2000);

                setTimeout(() => {
                    navigate("/unite");
                }, 1000);
            } else {
                console.error("Erreur lors de la création de l'unité");
                setError("Une erreur s'est produite lors de la création de l'unité.");
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'unité: ", error);
            setError("Une erreur s'est produite lors de la création de l'unité.");
        }
    };

    return (
        <>
            <h2>Ajouter une nouvelle unité :</h2>

            <Form onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                   {/* <Form.Group as={Col} controlId="formGridIdunite">
                        <Form.Label>Id unite *</Form.Label>
                        <Form.Control
                            type="text"
                            name="idunite"
                            value={unite.idunite}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>*/}

                   {/* <Form.Group as={Col} controlId="formGridIstrans">
                        <Form.Label>Istrans</Form.Label>
                        <Form.Control
                            type="text"
                            name="istrans"
                            value={unite.istrans}
                            onChange={handleChange}
                        />
                    </Form.Group>*/}

                </Row>
                <Row className="mb-3">



                    <Form.Group as={Col} controlId="formGridNom">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={unite.nom}
                            onChange={handleChange}
                            required
                            pattern="^[A-Za-zÀ-ÿ\s'’.,\-]{1,120}$"
                            title="Nom : lettres seulement, 120 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNomUK">
                        <Form.Label>Nom UK</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomUK"
                            value={unite.nomUK}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,120}$"
                            title="NomUK : lettres seulement, 120 caractères max."
                        />
                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPreflang">
                        <Form.Label>Préférence de langues *</Form.Label>
                        <Form.Select
                            name="preflang"
                            value={unite.preflang}
                            onChange={handleChange}
                        >
                            <option value="FR">FR</option>
                            <option value="UK">UK</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSigle">
                        <Form.Label>Sigle</Form.Label>
                        <Form.Control
                            type="text"
                            name="sigle"
                            value={unite.sigle}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,20}$"
                            title="Sigle : lettres seulement, 20 caractères max."
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
                            value={unite.descriptionUK}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,2500}$"
                            title="DescriptionUK : lettres seulement, 2500 caractères max."
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
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,80}$"
                            title="Rue : lettres seulement, 80 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNumero">
                        <Form.Label>Numéro</Form.Label>
                        <Form.Control
                            type="text"
                            name="numero"
                            value={unite.numero}
                            onChange={handleChange}
                            pattern="^[0-9]{1,10}$"
                            title="Numéro : chiffre seulement, 10 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBoite">
                        <Form.Label>Boîte</Form.Label>
                        <Form.Control
                            type="text"
                            name="boite"
                            value={unite.boite}
                            onChange={handleChange}
                            pattern="^[0-9]{1,10}$"
                            title="Numéro : chiffre seulement, 10 caractères max."
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
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,80}$"
                            title="Localité : lettres seulement, 80 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCodePostal">
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control
                            type="text"
                            name="codepostal"
                            value={unite.codepostal}
                            onChange={handleChange}
                            pattern="^[0-9]{1,5}$"
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
                            pattern="^[0-9\s]{1,8}$"
                            title="Le CPI doit contenir que des chiffres (8 caractères max)"
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
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,80}$"
                            title="Localisation : lettres seulement, 80 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTelephone">
                        <Form.Label>Téléphone *</Form.Label>
                        <Form.Control
                            type="text"
                            name="telephone"
                            value={unite.telephone}
                            onChange={handleChange}
                            required
                            pattern="^\+\d{2} \d{9}$"
                            title="Le numéro de téléphone doit être au format +32 4XXXXXXX"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFax">
                        <Form.Label>Fax</Form.Label>
                        <Form.Control
                            type="text"
                            name="fax"
                            value={unite.fax}
                            onChange={handleChange}
                            pattern="^\+\d{2} \d{9}$"
                            title="Le numéro de fax doit être au format +32 4XXXXXXX"
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
                            pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                            title="L'adresse e-mail n'est pas au format valide"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSite1">
                        <Form.Label>Site web 1</Form.Label>
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
                        <Form.Label>Site web 2</Form.Label>
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

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridLienthese">
                        <Form.Label>Lien Thèse</Form.Label>
                        <Form.Control
                            type="text"
                            name="lienthese"
                            value={unite.lienthese}
                            onChange={handleChange}
                            pattern="^(https?://)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(/.*)?$"
                            title="L'URL doit être au format http://, https://, ou www."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLienpublica">
                        <Form.Label>Lien Publication</Form.Label>
                        <Form.Control
                            type="url"
                            name="lienpublica"
                            value={unite.lienpublica}
                            onChange={handleChange}
                            pattern="https?://.+"
                            title="L'URL doit être au format http:// ou https://"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDatedeb">
                        <Form.Label>Date de début</Form.Label>
                        <Form.Control
                            type="date"
                            name="datedeb"
                            value={unite.datedeb}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDatefin">
                        <Form.Label>Date de fin</Form.Label>
                        <Form.Control
                            type="date"
                            name="datefin"
                            value={unite.datefin}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDatemaj">
                        <Form.Label>Date de mise à jour</Form.Label>
                        <Form.Control
                            type="date"
                            name="datemaj"
                            value={unite.datemaj}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridRemarque">
                        <Form.Label>Remarque</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="remarque"
                            value={unite.remarque}
                            onChange={handleChange}
                            rows={3}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBrouillon">
                        <Form.Label>Brouillon</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="brouillon"
                            value={unite.brouillon}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,500}$"
                            title="brouillon : lettres seulement, 500 caractères max."
                            rows={3}
                        />
                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNbvisit">
                        <Form.Label>Nombre de visiteurs</Form.Label>
                        <Form.Control
                            type="text"
                            name="nbvisit"
                            value={unite.nbvisit}
                            onChange={handleChange}
                            pattern="^[0-9]{1,10}$"
                            title="nbvisit : chiffre seulement, 5 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPrefPublication">
                        <Form.Label>Préférence de publication</Form.Label>
                        <Form.Control
                            type="text"
                            name="prefPublication"
                            value={unite.prefPublication}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s'’\-.,]{1,5000}$"
                            title="prefPublication : lettres seulement, 5000 caractères max."
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridStatExport">
                        <Form.Label>Statut Export</Form.Label>
                        <Form.Control
                            name="statExport"
                            value={unite.statExport}
                            onChange={handleChange}
                            pattern="^[0-9]{1,5}$"
                            title="statExport : chiffre seulement, 5 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStatProjetcv">
                        <Form.Label>Statut Projet CV</Form.Label>
                        <Form.Control
                            name="statProjetcv"
                            value={unite.statProjetcv}
                            onChange={handleChange}
                            pattern="^[0-9]{1,5}$"
                            title="statProjetcv : chiffre seulement, 5 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStatAnciensmembres">
                        <Form.Label>Statut Anciens Membres</Form.Label>
                        <Form.Control
                            name="statAnciensmembres"
                            value={unite.statAnciensmembres}
                            onChange={handleChange}
                            pattern="^[0-9]{1,5}$"
                            title="statAnciensmembres : chiffre seulement, 5 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStatDelegue">
                        <Form.Label>Statut Délégué</Form.Label>
                        <Form.Control
                            name="statDelegue"
                            value={unite.statDelegue}
                            onChange={handleChange}
                            pattern="^[0-9]{1,5}$"
                            title="StatDelegue : chiffre seulement, 5 caractères max."
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStatAdzion">
                        <Form.Label>Statut Adzion</Form.Label>
                        <Form.Control
                            name="statAdzion"
                            value={unite.statAdzion}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <div className="col-md-3 text-right"> {/* Colonne prenant 3/12 de la largeur et alignée à droite */}
                    <hr />
                    <p>* Information requise</p>
                    <Button variant="primary" className="btn-custom"type="submit">
                        Envoyer
                    </Button>
                    <Button variant="secondary" className="btn-custom" onClick={() => handleNavigation("/unite")}>
                        Annuler
                    </Button>
                </div>



            </Form>

            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    L'unité a été ajoutée avec succès.
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

export default UniteAjouter;
