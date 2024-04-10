import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function UniteStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [totalUnites, setTotalUnites] = useState(0);
    const [totalNomUk, setTotalNomUk] = useState(0);
    const [totalDescription, setTotalDescription] = useState(0);
    const [totalLocalite, setTotalLocalite] = useState(0);
    const [totalTelephone, setTotalTelephone] = useState(0);
    const [totalFax, setTotalFax] = useState(0);
    const [totalRue, setTotalRue] = useState(0);
    const [totalEmail, setTotalEmail] = useState(0);
    const [totalSite1, setTotalSite1] = useState(0);
    const [totalSite2, setTotalSite2] = useState(0);
    const [totalRemarque, setTotalRemarque] = useState(0);
    const [totalUniteProjets, setTotalUniteProjets] = useState(0);
    const [moyenneProjetsParUnite, setMoyenneProjetsParUnite] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await axios.get("/api/zunite/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content.filter(
                        (item) => item.datefin === '0000-00-00 00:00:00'
                    );

                    const totalUnites = filteredData.length;
                    setTotalUnites(totalUnites);

                    const totalNomUk = filteredData.filter((item) => item.nomUk !== "").length;
                    setTotalNomUk(totalNomUk);

                    const totalDescription = filteredData.filter((item) => item.description !== "").length;
                    setTotalDescription(totalDescription);

                    const totalLocalite = filteredData.filter((item) => item.localite !== "").length;
                    setTotalLocalite(totalLocalite);

                    const totalTelephone = filteredData.filter((item) => item.telephone !== "").length;
                    setTotalTelephone(totalTelephone);

                    const totalFax = filteredData.filter((item) => item.fax !== "").length;
                    setTotalFax(totalFax);

                    const totalRue = filteredData.filter((item) => item.rue !== "").length;
                    setTotalRue(totalRue);

                    const totalEmail = filteredData.filter((item) => item.email !== "").length;
                    setTotalEmail(totalEmail);

                    const totalSite1 = filteredData.filter((item) => item.site1 !== "").length;
                    setTotalSite1(totalSite1);

                    const totalSite2 = filteredData.filter((item) => item.site2 !== "").length;
                    setTotalSite2(totalSite2);

                    const totalRemarque = filteredData.filter((item) => item.remarque !== "").length;
                    setTotalRemarque(totalRemarque);

                    const totalUniteProjets = filteredData.reduce((acc, cur) => {
                        return acc + (cur.refunite ? 1 : 0);
                    }, 0);
                    setTotalUniteProjets(totalUniteProjets);

                    const moyenneProjetsParUnite = totalUniteProjets / totalUnites;
                    setMoyenneProjetsParUnite(moyenneProjetsParUnite);
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
            <h2>Les statistiques</h2>
            <p>Il y a {totalUnites} unités au total</p>
            <p>{totalNomUk} unités possèdent un nom en anglais</p>
            <p>{totalDescription} unités possèdent une description</p>
            <p>{totalLocalite} unités ont une localité spécifiée</p>
            <p>{totalTelephone} unités ont un numéro de téléphone</p>
            <p>{totalFax} unités ont un fax</p>
            <p>{totalRue} unités possèdent une adresse physique</p>
            <p>{totalEmail} unités disposent d'une adresse e-mail</p>
            <p>{totalSite1} unités ont un site internet</p>
            <p>{totalSite2} unités ont même un deuxième site internet</p>
            <p>{totalRemarque} unités comportent une remarque</p>
            <p>Voici le nombre de projet par unité : {totalUniteProjets}</p>
            <p>avec une moyenne de projet par unité {moyenneProjetsParUnite}</p>
        </div>
    );
}

export default UniteStat;
