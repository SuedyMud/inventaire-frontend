import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert } from "react-bootstrap";

function ChercheurUpdate() {
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
                setTimeout(() => setShowNotif(false), 3000);
            } else {
                console.error("Erreur lors de la modification du chercheur");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du chercheur : ", error);
        }
    };

    return (
        <div>
            <h2>Modifier Chercheur :</h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="nom">
                    <Form.Label>Nom :</Form.Label>
                    <Form.Control
                        type="text"
                        name="nom"
                        value={chercheur.nom}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="prenom">
                    <Form.Label>Prénom :</Form.Label>
                    <Form.Control
                        type="text"
                        name="prenom"
                        value={chercheur.prenom}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="telephone">
                    <Form.Label>Téléphone :</Form.Label>
                    <Form.Control
                        type="text"
                        name="telephone"
                        value={chercheur.telephone}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email :</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={chercheur.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="cpi">
                    <Form.Label>CPI :</Form.Label>
                    <Form.Control
                        type="text"
                        name="cpi"
                        value={chercheur.cpi}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="site">
                    <Form.Label>Site web :</Form.Label>
                    <Form.Control
                        type="text"
                        name="site"
                        value={chercheur.site}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="campus">
                    <Form.Label>Campus :</Form.Label>
                    <Form.Control
                        type="text"
                        name="campus"
                        value={chercheur.campus}
                        onChange={handleChange}
                    />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Modifier
                </Button>
            </Form>
            {showNotif && (
                <Alert variant="success" onClose={() => setShowNotif(false)} dismissible>
                    Le chercheur a été modifié avec succès.
                </Alert>
            )}
        </div>
    );
}

export default ChercheurUpdate;
