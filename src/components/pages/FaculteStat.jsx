import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function FaculteStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [totalFacultes, setTotalFacultes] = useState(0);
    const [totalFaculteUk, setTotalFaculteUk] = useState(0);
    const [totalSigles, setTotalSigles] = useState(0);
    const [totalDateMajs, setTotalDateMajs] = useState(0);
    const [totalTactifs, setTotalTactifs] = useState(0);
    const [totalGroupes, setTotalGroupes] = useState(0);
    const [pourcentage, setPourcentage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const AccessToken = await getAccessTokenSilently();
                const response = await axios.get("/api/zfac/liste", {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                    params: {
                        size: 10000, // Nombre d'éléments par page
                    },
                });
                if (response.status === 200) {
                    const filteredData = response.data.content.filter(
                        (item) => item.actif === 1
                    );

                    const totalFacultes = filteredData.length;
                    setTotalFacultes(totalFacultes);

                    const totalFaculteUk = filteredData.filter((item) => {
                        return item.faculteUK !== "";
                    }).length;
                    setTotalFaculteUk(totalFaculteUk);

                    const pourcentage = ((totalFaculteUk / totalFacultes) * 100).toFixed(0);
                    setPourcentage(pourcentage);

                    const totalSigles = filteredData.filter((item) => item.sigle === "IEE").length;
                    setTotalSigles(totalSigles);

                    const totalDateMajs = filteredData.filter((item) => {
                        return item.dmaj === null;
                    }).length;
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
    }, [getAccessTokenSilently]);

    return (
        <div className="container">
            <h2>Les statistiques des facultés</h2>
            <p>Il y a {totalFacultes} facultés au total</p>
            <p>{totalFaculteUk} facultés ont un nom en anglais ({pourcentage}%)</p>
            <p>{totalSigles} facultés proviennent de l'Institut d'Enseignement Interfacultaire</p>
            <p>{totalDateMajs} facultés ne possèdent pas de date de mise à jour</p>
            <p>Actuellement, il y a {totalTactifs} facultés actives</p>
            <p>{totalGroupes} facultés proviennent du PoLE SANTÉ</p>
        </div>
    );
}

export default FaculteStat;
