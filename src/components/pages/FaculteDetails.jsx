import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

function FaculteDetails() {
    const { getAccessTokenSilently } = useAuth0();
    const { type } = useParams();
    const [facultes, setFacultes] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("/api/zfac/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 10000, // Nombre d'éléments par page
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content.filter(
                        (item) => item.actif === 1
                    );

                    let filteredFacultes;
                    switch (type) {
                        case "sans-nom-uk":
                            filteredFacultes = filteredData.filter((item) => item.faculteUK === "");
                            setTitle("Facultés sans nom en anglais");
                            break;
                        case "sans-sigle-iee":
                            filteredFacultes = filteredData.filter((item) => item.sigle !== "IEE");
                            setTitle("Facultés sans sigle IEE");
                            break;
                        case "sans-date-maj":
                            filteredFacultes = filteredData.filter((item) => !item.dmaj);
                            setTitle("Facultés sans date de mise à jour");
                            break;
                        case "inactives":
                            filteredFacultes = filteredData.filter((item) => item.actif !== 1);
                            setTitle("Facultés inactives");
                            break;
                        case "sans-pole-sante":
                            filteredFacultes = filteredData.filter((item) => item.groupe !== "PoLE SANTÉ");
                            setTitle("Facultés hors PoLE SANTÉ");
                            break;
                        default:
                            filteredFacultes = [];
                            setTitle("Détails des facultés");
                    }

                    setFacultes(filteredFacultes);
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
                {facultes.map((faculte) => (
                    <li key={faculte.fac}>
                        {/* Redirection vers la page de détails de la faculté */}
                        <Link
                            to={{
                                pathname: `/faculteDetail/${faculte.fac}`,
                                state: {
                                    faculte: faculte.faculte,
                                    faculteUk: faculte.faculteUK
                                }
                            }}
                            style={{ textDecoration: 'none' }}
                        >
                            <p>{faculte.faculte}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FaculteDetails;
