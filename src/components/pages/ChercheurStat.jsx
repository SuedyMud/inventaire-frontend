import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";

function ChercheurStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalChercheurs: 0,
        totalTelephone: 0,
        totalEmail: 0,
        totalSite: 0,
    });

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
                        (item) => item.idche !== ""
                    );

                    const totalChercheurs = filteredData.length;

                    const statistics = {
                        totalChercheurs: totalChercheurs,
                        totalTelephone: filteredData.filter((item) => item.telephone === "").length,
                        totalEmail: filteredData.filter((item) => item.email === "").length,
                        totalSite: filteredData.filter((item) => item.site === "").length,
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
Il y a ${statistics.totalChercheurs} chercheurs au total
${generateText(statistics.totalTelephone, "chercheur ne dispose pas d'un téléphone professionnel", "chercheurs ne disposent pas d'un téléphone professionnel")}
${generateText(statistics.totalEmail, "chercheur ne dispose pas d'une adresse mail", "chercheurs ne disposent pas d'une adresse mail")}
${generateText(statistics.totalSite, "chercheur ne possède pas de site web", "chercheurs ne possèdent pas de site web")}
        `;
        const blob = new Blob([data], { type: "text/plain" });
        saveAs(blob, "chercheur_statistiques.txt");
    };

    const downloadExcelFile = () => {
        const data = [
            ["Statistiques", "Valeurs"],
            ["Total Chercheurs", statistics.totalChercheurs],
            ["Chercheurs sans Téléphone", statistics.totalTelephone],
            ["Chercheurs sans Email", statistics.totalEmail],
            ["Chercheurs sans Site Web", statistics.totalSite],
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Statistiques");
        XLSX.writeFile(workbook, "chercheur_statistiques.xlsx");
    };

    return (
        <div className="container">
            <h2>Les statistiques des chercheurs</h2>
            <p>{generateText(statistics.totalChercheurs, "chercheur au total", "chercheurs au total")}</p>
            <p>{generateText(statistics.totalTelephone, "chercheur ne dispose pas d'un téléphone professionnel", "chercheurs ne disposent pas d'un téléphone professionnel")}</p>
            <p>{generateText(statistics.totalEmail, "chercheur ne dispose pas d'une adresse mail", "chercheurs ne disposent pas d'une adresse mail")}</p>
            <p>{generateText(statistics.totalSite, "chercheur ne possède pas de site web", "chercheurs ne possèdent pas de site web")}</p>

            <Button variant="primary" className="btn-custom" onClick={downloadTxtFile}>Télécharger en format texte</Button>
            <Button variant="primary" className="btn-custom" onClick={downloadExcelFile}>Télécharger en format Excel</Button>
        </div>
    );
}

export default ChercheurStat;
