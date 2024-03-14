import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Layout from "../structure/Layout.jsx";
import { Link } from "react-router-dom";

function Chercheur() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentLetter, setCurrentLetter] = useState(""); // Ajout de l'état pour la lettre sélectionnée

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zchercheur/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                },
            });

            if (response.status === 200) {
                const sortedData = response.data.content.sort((a, b) => a.nom.localeCompare(b.nom));
                setData(sortedData);

                // Recalculer le nombre total de pages après le filtrage
                const totalFilteredPages = Math.ceil(sortedData.length / 20); // supposons que vous affichiez 20 éléments par page
                setTotalPages(totalFilteredPages);
            } else {
                console.error("Erreur lors de la récupération des données");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données : ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, getAccessTokenSilently, currentLetter]);

    // Fonction pour filtrer les données en fonction de la lettre sélectionnée
    const filterDataByLetter = (letter) => {
        setCurrentLetter(letter);
        setCurrentPage(0); // Réinitialiser la pagination à la première page
    };

    return (
        <>
            <h2>Répertoire des Chercheurs</h2>
            <div>

                <ListGroup as="ul">
                    {data
                        .filter((item) => currentLetter === "" || item.nom.charAt(0).toUpperCase() === currentLetter)
                        .map((item) => (
                            <ListGroup.Item
                                as="li"
                                key={item.idche}
                                className="d-flex justify-content-between align-items-center my-1">
                                <div>
                                    <Link to={`/chercheur/${item.idche}`} style={{ textDecoration: "none" }}>
                                        <p>
                                            {item.nom} {item.prenom}
                                        </p>
                                    </Link>
                                </div>
                            </ListGroup.Item>
                        ))}
                </ListGroup>
                {/* Ajout des boutons de lettre */}
                <div className="letters-pagination">
                    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                        <Button key={letter} onClick={() => filterDataByLetter(letter)}>
                            {letter}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Chercheur;
