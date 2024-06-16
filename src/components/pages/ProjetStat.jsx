import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";

function ProjetStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalProjets: 0,
        totalNom: 0,
        totalNomUk: 0,
        totalNomProgramme: 0,
        totalNomProgrammeUk: 0,
        totalResume: 0,
        totalResumeUk: 0,
        totalDateMaj: 0,
        totalSite: 0,
        totalUniteProjets: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await axios.get("/api/zprojet/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 10000, // Nombre d'éléments par page
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content.filter(
                        (item) => item.datefin === null
                    );

                    const totalProjets = filteredData.length;

                    const statistics = {
                        totalProjets: totalProjets,
                        totalNom: filteredData.filter((item) => item.nom === "").length,
                        totalNomUk: filteredData.filter((item) => item.nomUK === "").length,
                        totalNomProgramme: filteredData.filter((item) => item.nomprogramme === "").length,
                        totalNomProgrammeUk: filteredData.filter((item) => item.nomprogrammeUK === "").length,
                        totalResume: filteredData.filter((item) => item.resume === "").length,
                        totalResumeUk: filteredData.filter((item) => item.resumeUK === "").length,
                        totalDateMaj: filteredData.filter((item) => item.datemaj === "").length,
                        totalSite: filteredData.filter((item) => item.site === "").length,
                        totalUniteProjets: filteredData.reduce((acc, cur) => acc + (!cur.refunite ? 1 : 0), 0)
                    };

                    setStatistics(statistics);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently]);

    const generateText = (count, singularText, pluralText) => {
        return count === 1 ? `${count} ${singularText}` : `${count} ${pluralText}`;
    };

    const downloadTxtFile = () => {
        const data = `
Il y a ${statistics.totalProjets} projets au total
${generateText(statistics.totalNom, "projet ne possède pas de nom", "projets ne possèdent pas de nom")}
${generateText(statistics.totalNomUk, "projet ne possède pas de nom en anglais", "projets ne possèdent pas de nom en anglais")}
${generateText(statistics.totalNomProgramme, "projet ne possède pas de nom de programme", "projets ne possèdent pas de nom de programme")}
${generateText(statistics.totalNomProgrammeUk, "projet ne possède pas de nom de programme en anglais", "projets ne possèdent pas de nom de programme en anglais")}
${generateText(statistics.totalResume, "projet ne possède pas de résumé", "projets ne possèdent pas de résumé")}
${generateText(statistics.totalResumeUk, "projet ne possède pas de résumé en anglais", "projets ne possèdent pas de résumé en anglais")}
${generateText(statistics.totalDateMaj, "projet ne possède pas de date de mise à jour", "projets ne possèdent pas de date de mise à jour")}
${generateText(statistics.totalSite, "projet ne possède pas de site internet", "projets ne possèdent pas de site internet")}
${generateText(statistics.totalUniteProjets, "projet n'a pas d'unité", "projets n'ont pas d'unité")}
        `;
        const blob = new Blob([data], { type: "text/plain" });
        saveAs(blob, "projet_statistiques.txt");
    };

    const downloadExcelFile = () => {
        const data = [
            ["Statistiques", "Valeurs"],
            ["Total Projets", statistics.totalProjets],
            ["Projets sans Nom", statistics.totalNom],
            ["Projets sans Nom UK", statistics.totalNomUk],
            ["Projets sans Nom Programme", statistics.totalNomProgramme],
            ["Projets sans Nom Programme UK", statistics.totalNomProgrammeUk],
            ["Projets sans Résumé", statistics.totalResume],
            ["Projets sans Résumé UK", statistics.totalResumeUk],
            ["Projets sans Date de Mise à Jour", statistics.totalDateMaj],
            ["Projets sans Site", statistics.totalSite],
            ["Projets sans Unité", statistics.totalUniteProjets],
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Statistiques");
        XLSX.writeFile(workbook, "projet_statistiques.xlsx");
    };

    return (
        <div className="container">
            <h2>Les statistiques des projets</h2>
            <p>{generateText(statistics.totalProjets, "projet au total", "projets au total")}</p>
            <p>{generateText(statistics.totalNom, "projet ne possède pas de nom", "projets ne possèdent pas de nom")}</p>
            <p>{generateText(statistics.totalNomUk, "projet ne possède pas de nom en anglais", "projets ne possèdent pas de nom en anglais")}</p>
            <p>{generateText(statistics.totalNomProgramme, "projet ne possède pas de nom de programme", "projets ne possèdent pas de nom de programme")}</p>
            <p>{generateText(statistics.totalNomProgrammeUk, "projet ne possède pas de nom de programme en anglais", "projets ne possèdent pas de nom de programme en anglais")}</p>
            <p>{generateText(statistics.totalResume, "projet ne possède pas de résumé", "projets ne possèdent pas de résumé")}</p>
            <p>{generateText(statistics.totalResumeUk, "projet ne possède pas de résumé en anglais", "projets ne possèdent pas de résumé en anglais")}</p>
            <p>{generateText(statistics.totalDateMaj, "projet ne possède pas de date de mise à jour", "projets ne possèdent pas de date de mise à jour")}</p>
            <p>{generateText(statistics.totalSite, "projet ne possède pas de site internet", "projets ne possèdent pas de site internet")}</p>
            <p>{generateText(statistics.totalUniteProjets, "projet n'a pas d'unité", "projets n'ont pas d'unité")}</p>

            <Button variant="primary" className="btn-custom" onClick={downloadTxtFile}>Télécharger en format texte</Button>
            <Button variant="primary" className="btn-custom" onClick={downloadExcelFile}>Télécharger en format Excel</Button>
        </div>
    );
}

export default ProjetStat;
