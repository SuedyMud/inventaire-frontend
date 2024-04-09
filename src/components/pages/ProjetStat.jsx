import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function ProjetStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [totalProjets, setTotalProjets] = useState(0);
    const [totalNomUk, setTotalNomUk] = useState(0);
    const [totalNomProgramme, setTotalNomProgramme] = useState(0);
    const [totalNomProgrammeUk, setTotalNomProgrammeUk] = useState(0);
    const [totalResume, setTotalResume] = useState(0);
    const [totalResumeUk, setTotalResumeUk] = useState(0);
    const [totalDateMaj, setTotalDateMaj] = useState(0);
    const [totalSite, setTotalSite] = useState(0);
    const [totalUniteProjets, setTotalUniteProjets] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await axios.get("/api/zprojet/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content.filter(
                        (item) => item.datefin === '0000-00-00 00:00:00'
                    );

                    const totalProjets = filteredData.length;
                    setTotalProjets(totalProjets);

                    const totalNomUk = filteredData.filter((item) => item.nomUk !== "").length;
                    setTotalNomUk(totalNomUk);

                    const totalNomProgramme = filteredData.filter((item) => item.nomProgramme !== "").length;
                    setTotalNomProgramme(totalNomProgramme);

                    const totalNomProgrammeUk = filteredData.filter((item) => item.nomProgrammeUk !== "").length;
                    setTotalNomProgrammeUk(totalNomProgrammeUk);

                    const totalResume = filteredData.filter((item) => item.resume !== "").length;
                    setTotalResume(totalResume);

                    const totalResumeUk = filteredData.filter((item) => item.resumeUk !== "").length;
                    setTotalResumeUk(totalResumeUk);

                    const totalDateMaj = filteredData.filter((item) => item.datemaj !== "").length;
                    setTotalDateMaj(totalDateMaj);

                    const totalSite = filteredData.filter((item) => item.site !== "").length;
                    setTotalSite(totalSite);

                    const totalUniteProjets = filteredData.reduce((acc, cur) => {
                        return acc + (cur.refunite ? 1 : 0);
                    }, 0);
                    setTotalUniteProjets(totalUniteProjets);
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
            <p>Il y a {totalProjets} projets au total</p>
            <p>{totalNomUk} projets ont un nom en anglais</p>
            <p>{totalNomProgramme} projets possèdent un nom de programme</p>
            <p>{totalNomProgrammeUk} projets ont un nom de programme en anglais</p>
            <p>{totalResume} projets ont un résumé</p>
            <p>{totalResumeUk} projets sont en anglais</p>
            <p>{totalDateMaj} projets ont une date de mise à jour</p>
            <p>{totalSite} projets possèdent un site internet</p>
            <p>{totalUniteProjets} est le nombre de projets par unité</p>
        </div>
    );
}

export default ProjetStat;
