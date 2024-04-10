import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function ChercheurStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await axios.get("/api/chercheur/statistiques", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const filteredStats = {
                        totalChercheurs: response.data.totalChercheurs,
                        totalTelephone: response.data.totalTelephone,
                        totalEmail: response.data.totalEmail,
                        totalSite: response.data.totalSite,
                        // Appliquez d'autres filtres selon vos besoins
                    };
                    setStats(filteredStats);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently]);

    return (
        <div className="container">
            <h2>Les statistiques des chercheurs</h2>
            {stats ? (
                <div>
                    <p>Il y a {stats.totalChercheurs} chercheurs au total</p>
                    <p>{stats.totalTelephone} chercheurs disposent d'un téléphone professionnel</p>
                    <p>{stats.totalEmail} chercheurs disposent d'une adresse mail</p>
                    <p>{stats.totalSite} chercheurs possèdent un site web</p>
                </div>
            ) : (
                <p>Chargement en cours...</p>
            )}
        </div>
    );
}

export default ChercheurStat;
