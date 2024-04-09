import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"; // Import de useAuth0 depuis auth0-react

function FaculteStat() {
    const { getAccessTokenSilently } = useAuth0(); // Utilisation de useAuth0 pour obtenir getAccessTokenSilently

    const [totalFacultes, setTotalFacultes] = useState(0);
    const [totalFaculteUk, setTotalFaculteUk] = useState(0);
    const [totalSigles, setTotalSigles] = useState(0);
    const [totalDateMajs, setTotalDateMajs] = useState(0);
    const [totalTactifs, setTotalTactifs] = useState(0);
    const [totalGroupes, setTotalGroupes] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const AccessToken = await getAccessTokenSilently(); // Utilisation de getAccessTokenSilently pour obtenir le jeton d'accès
                const response = await axios.get("/api/zfac/liste", {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                });
                if (response.status === 200) {
                    console.log("Données brutes :", response.data.content);

                    const filteredData = response.data.content.filter(
                        (item) => item.actif === 1 && item.invent20 === 1
                    );

                    // Calcul des statistiques
                    const totalFacultes = filteredData.length;
                    setTotalFacultes(totalFacultes);

                    const totalFaculteUk = filteredData.filter((item) => item.FaculteUk !== "").length;
                    setTotalFaculteUk(totalFaculteUk);

                    const totalSigles = filteredData.filter((item) => item.sigle === "IEE").length;
                    setTotalSigles(totalSigles);

                    const totalDateMajs = filteredData.filter((item) => item.dmaj === "0000-00-00").length;
                    setTotalDateMajs(totalDateMajs);

                    const totalTactifs = filteredData.filter((item) => item.actif === 1).length;
                    setTotalTactifs(totalTactifs);

                    const totalGroupes = filteredData.filter((item) => item.groupe === "PoLE SANTÉ").length;
                    setTotalGroupes(totalGroupes);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently]); // Utilisation de getAccessTokenSilently comme dépendance

    return (
        <div className="container">
            <h2>Les statistiques</h2>
            <p>Il y a {totalFacultes} facultés au total</p>
            <p>{totalFaculteUk} facultés ont un nom en anglais</p>
            <p>{totalSigles} facultés proviennent de l'Institut d'Enseignement Interfacultaire</p>
            <p>{totalDateMajs} facultés ne possèdent pas de date de mise à jour</p>
            <p>Actuellement, il y a {totalTactifs} facultés actives</p>
            <p>{totalGroupes} facultés proviennent du PoLE SANTÉ</p>
        </div>
    );
}

export default FaculteStat;
