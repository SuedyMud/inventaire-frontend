import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

function ProjetDetails() {
    const { getAccessTokenSilently } = useAuth0();
    const { type } = useParams();
    const [projets, setProjets] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("/api/zprojet/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 10000,
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content.filter(
                        (item) => item.datefin === null
                    );

                    let filteredProjets;
                    switch (type) {
                        case "sans-nom":
                            filteredProjets = filteredData.filter((item) => item.nom === "");
                            setTitle("Projets sans nom");
                            break;
                        case "sans-nom-uk":
                            filteredProjets = filteredData.filter((item) => item.nomUK === "");
                            setTitle("Projets sans nom en anglais");
                            break;
                        case "sans-nom-programme":
                            filteredProjets = filteredData.filter((item) => item.nomprogramme === "");
                            setTitle("Projets sans nom de programme");
                            break;
                        case "sans-nom-programme-uk":
                            filteredProjets = filteredData.filter((item) => item.nomprogrammeUK === "");
                            setTitle("Projets sans nom de programme en anglais");
                            break;
                        case "sans-resume":
                            filteredProjets = filteredData.filter((item) => item.resume === "");
                            setTitle("Projets sans résumé");
                            break;
                        case "sans-resume-uk":
                            filteredProjets = filteredData.filter((item) => item.resumeUK === "");
                            setTitle("Projets sans résumé en anglais");
                            break;
                        case "sans-datemaj":
                            filteredProjets = filteredData.filter((item) => item.datemaj === "");
                            setTitle("Projets sans date de mise à jour");
                            break;
                        case "sans-site":
                            filteredProjets = filteredData.filter((item) => item.site === "");
                            setTitle("Projets sans site internet");
                            break;
                        case "sans-unite":
                            filteredProjets = filteredData.filter((item) => !item.refunite);
                            setTitle("Projets sans unité");
                            break;
                        default:
                            filteredProjets = [];
                            setTitle("Détails des projets");
                    }

                    setProjets(filteredProjets);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently, type]);

    return (
        <div className="container">
            <h2>{title}</h2>
            <ul>
                {projets.map((projet) => (
                    <li key={projet.idprojet}>
                        <Link to={`/projetDetail/${projet.idprojet}`}>
                            {projet.nom}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjetDetails;
