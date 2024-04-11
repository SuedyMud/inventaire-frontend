import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function ChercheurStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [totalChercheurs, setTotalChercheurs] = useState(0);
    const [totalTelephone, setTotalTelephone] = useState(0);
    const [totalEmail, setTotalEmail] = useState(0);
    const [totalSite, setTotalSite] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await axios.get("/api/zchercheur/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 1000000, // Nombre d'éléments par page
                    },
                });

                if (response.status === 200) {

                    const filteredData = response.data.content.filter(

                        (item) => {
                            console.log(item.idche);
                            return item.idche !== "";
                        }
                    );

                    const totalChercheurs = filteredData.length;
                    setTotalChercheurs(totalChercheurs);

                    const totalTelephone = filteredData.filter((item) => item.telephone !== "").length;
                    setTotalTelephone(totalTelephone);

                    const totalEmail = filteredData.filter((item) => item.email !== "").length;
                    setTotalEmail(totalEmail);

                    const totalSite = filteredData.filter((item) => item.site !== "").length;
                    setTotalSite(totalSite);

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

            <div>
                <p>Il y a {totalChercheurs} chercheurs au total</p>
                <p>{totalTelephone} chercheurs disposent d'un téléphone professionnel</p>
                <p>{totalEmail} chercheurs disposent d'une adresse mail</p>
                <p>{totalSite} chercheurs possèdent un site web</p>
                <p>Voici le nombre de chercheurs actuellement dans une unité de recherche ?</p>
            </div>

        </div>
    );
}

export default ChercheurStat;
