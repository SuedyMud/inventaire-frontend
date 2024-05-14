import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert } from "react-bootstrap";

function ChercheurCreate() {
    const { getAccessTokenSilently } = useAuth0();
    const [chercheur, setChercheur] = useState({
        Nom: "",
        Prenom: "",
        Titre: "",
        Matricule: "",
        CPI: "",
        Telephone: "",
        Email: "",
        Fax: "",
        Site: "",
        Corps: "",
        CorpsOrdre: "",
        DDig: "",
        FacChe: "",
        PrefPublication: ""
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
            <h2>Créer un Chercheur :</h2>
            <Form onSubmit={handleFormSubmit}>

                <Form.Group controlId="nom">
                    <Form.Label>Nom :</Form.Label>
                    <Form.Control
                        type="text"
                        name="Nom"
                        value={chercheur.Nom}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="prenom">
                    <Form.Label>Prénom :</Form.Label>
                    <Form.Control
                        type="text"
                        name="Prenom"
                        value={chercheur.Prenom}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="telephone">
                    <Form.Label>Téléphone :</Form.Label>
                    <Form.Control
                        type="text"
                        name="Telephone"
                        value={chercheur.Telephone}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email :</Form.Label>
                    <Form.Control
                        type="email"
                        name="Email"
                        value={chercheur.Email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="cpi">
                    <Form.Label>CPI :</Form.Label>
                    <Form.Control
                        type="text"
                        name="CPI"
                        value={chercheur.CPI}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="site">
                    <Form.Label>Site web :</Form.Label>
                    <Form.Control
                        type="text"
                        name="Site"
                        value={chercheur.Site}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="titre">
                    <Form.Label>Titre :</Form.Label>
                    <Form.Control
                        type="text"
                        name="Titre"
                        value={chercheur.Titre}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="matricule">
                    <Form.Label>Matricule :</Form.Label>
                    <Form.Control
                        type="text"
                        name="Matricule"
                        value={chercheur.Matricule}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="fax">
                    <Form.Label>Fax :</Form.Label>
                    <Form.Control
                        type="text"
                        name="Fax"
                        value={chercheur.Fax}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="corps">
                    <Form.Label>Corps :</Form.Label>
                    <Form.Control
                        type="text"
                        name="Corps"
                        value={chercheur.Corps}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="corpsOrdre">
                    <Form.Label>Corps Ordre :</Form.Label>
                    <Form.Control
                        type="text"
                        name="CorpsOrdre"
                        value={chercheur.CorpsOrdre}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="ddig">
                    <Form.Label>Date de début d'inscription au grade :</Form.Label>
                    <Form.Control
                        type="date"
                        name="DDig"
                        value={chercheur.DDig}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="facChe">
                    <Form.Label>Faculté d'inscription :</Form.Label>
                    <Form.Control
                        type="text"
                        name="FacChe"
                        value={chercheur.FacChe}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Créer
                </Button>
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
