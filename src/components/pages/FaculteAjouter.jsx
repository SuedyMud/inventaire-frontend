import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FaculteAjouter() {
    const { getAccessTokenSilently } = useAuth0();
    const [faculte, setFaculte] = useState({
        fac: "",
        faculte: "",
        faculteUK: "",
        sigle: "",
        dMaj: new Date().toISOString().substr(0, 10),
        cc: "",
        infofin: 0,
        idFac: "",
        actif: "1", // Valeur par défaut
        groupe: "",
        invent20: "1", // Valeur par défaut
    });

    const [showNotif, setShowNotif] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Générateur d'identifiant alphabétique pour 'fac'
    const generateFacId = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = 0; i < 3; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return result;
    };

    // Générateur d'identifiant numérique pour 'idFac'
    const generateNumericId = () => {
        return Math.floor(1000 + Math.random() * 9000); // Génère un ID de 4 chiffres
    };

    // Initialiser les valeurs générées lors du montage du composant
    useEffect(() => {
        setFaculte((prevFaculte) => ({
            ...prevFaculte,
            fac: generateFacId(),
            idFac: generateNumericId(),
        }));
    }, []);

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

            if (response.status === 200 || response.status === 201) {
                console.log("Faculté créée avec succès");
                setShowNotif(true);
                // Optionnel: Réinitialiser le formulaire ou rediriger
                // navigate("/faculte"); // Par exemple, rediriger vers la liste des facultés

                setTimeout(() => {
                    navigate("/faculte");
                }, 1000);
            } else {
                console.error("Erreur lors de la création de la faculté");
                setError("Erreur inattendue lors de la création de la faculté.");
            }
        } catch (error) {
            console.error("Erreur lors de la création de la faculté : ", error);
            setError("Une erreur s'est produite lors de la création de la faculté.");
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <h2>Ajouter une nouvelle faculté :</h2>
            <Form onSubmit={handleFormSubmit}>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFac">
                        <Form.Label>Fac *</Form.Label>
                        <Form.Control
                            type="text"
                            name="fac"
                            value={faculte.fac}
                           /* readOnly // Empêche la modification manuelle*/
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFaculte">
                        <Form.Label>Faculté *</Form.Label>
                        <Form.Control
                            type="text"
                            name="faculte"
                            value={faculte.faculte}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s]{1,70}$"
                            title="La faculté ne peut pas contenir de chiffres (70 caractères max)"
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFaculteUK">
                        <Form.Label>Faculté UK</Form.Label>
                        <Form.Control
                            type="text"
                            name="faculteUK"
                            value={faculte.faculteUK}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ\s]{1,70}$"
                            title="La faculté UK ne peut pas contenir de chiffres (70 caractères max)"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridSigle">
                        <Form.Label>Sigle *</Form.Label>
                        <Form.Select
                            name="sigle"
                            value={faculte.sigle}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionnez un sigle</option>
                            <option value="TIC">TIC</option>
                            <option value="Droit">Droit</option>
                            <option value="PHILOSCSOC">PHILOSCSOC</option>
                            <option value="Psycho">Psycho</option>
                            <option value="Sciences">Sciences</option>
                            <option value="Médecine">Médecine</option>
                            <option value="Esp">Esp</option>
                            <option value="Hopital Erasme">Hopital Erasme</option>
                            <option value="Pôle Santé">Pôle Santé</option>
                            <option value="Autre">Autre</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDMaj">
                        <Form.Label>Date de Mise à Jour</Form.Label>
                        <Form.Control
                            type="date"
                            name="dMaj"
                            value={faculte.dMaj}
                            readOnly // Empêche la modification
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCC">
                        <Form.Label>CC *</Form.Label>
                        <Form.Select
                            name="cc"
                            value={faculte.cc}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionnez un CC</option>
                            <option value="Philo">Philo</option>
                            <option value="Droit">Droit</option>
                            <option value="PHILOSCSOC">PHILOSCSOC</option>
                            <option value="Psycho">Psycho</option>
                            <option value="Sciences">Sciences</option>
                            <option value="Médecine">Médecine</option>
                            <option value="Esp">Esp</option>
                            <option value="Hopital Erasme">Hopital Erasme</option>
                            <option value="Pôle Santé">Pôle Santé</option>
                            <option value="Autre">Autre</option>
                        </Form.Select>
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
                            min="0" // Exemple de validation supplémentaire
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridIdFac">
                        <Form.Label>ID Fac *</Form.Label>
                        <Form.Control
                            type="number"
                            name="idFac"
                            value={faculte.idFac}
                            readOnly // Empêche la modification manuelle
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGroupe">
                        <Form.Label>Groupe *</Form.Label>
                        <Form.Select
                            name="groupe"
                            value={faculte.groupe}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionnez un groupe</option>
                            <option value="PoLE SANTÉ">PoLE SANTÉ</option>
                            <option value="Autre">Autre</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridActif">
                        <Form.Label>Actif *</Form.Label>
                        <Form.Select
                            name="actif"
                            value={faculte.actif}
                            onChange={handleChange}
                            required
                        >
                            <option value="1">Oui</option>
                            <option value="0">Non</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridInvent20">
                        <Form.Label>Invent20 *</Form.Label>
                        <Form.Select
                            name="invent20"
                            value={faculte.invent20}
                            onChange={handleChange}
                            required
                        >
                            <option value="1">Oui</option>
                            <option value="0">Non</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <div>
                    <hr />
                    <p>* Informations requises</p>
                </div>

                <div className="btn">
                    <Button variant="primary" type="submit" className="btn-custom">
                        Envoyer
                    </Button>

                    <Button
                        variant="outline-info"
                        className="btn-custom"
                        onClick={() => handleNavigation("/faculteStat")}
                    >
                        Statistiques
                    </Button>

                    <Button
                        variant="outline-secondary"
                        className="btn-custom"
                        onClick={() => handleNavigation("/faculte")}
                    >
                        Facultés
                    </Button>
                </div>

            </Form>

            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    La faculté a été ajoutée avec succès.
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
