import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { saveAs } from 'file-saver';
import axios from "axios";
import * as XLSX from "xlsx";

function FrascatiStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalIdFrascati: 0,
        totalNom: 0,
        totalNomUK: 0,
        totalDescription: 0,
        totalDescriptionUK: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await axios.get("/api/zfrascati/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 10000, // Nombre d'éléments par page
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content;

                    const totalIdFrascati = filteredData.length;

                    const statistics = {
                        totalIdFrascati: totalIdFrascati,
                        totalNom: filteredData.filter((item) => item.nom === "").length,
                        totalNomUK: filteredData.filter((item) => item.nomUK === "").length,
                        totalDescription: filteredData.filter((item) => item.description === "").length,
                        totalDescriptionUK: filteredData.filter((item) => item.descriptionUK === "").length
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
Il y a ${statistics.totalIdFrascati} Frascati au total
${generateText(statistics.totalNom, "frascati ne possède pas de nom", "frascatis ne possèdent pas de nom")}
${generateText(statistics.totalNomUK, "frascati ne possède pas de nom en anglais", "frascatis ne possèdent pas de nom en anglais")}
${generateText(statistics.totalDescription, "frascati ne possède pas de description", "frascatis ne possèdent pas de description")}
${generateText(statistics.totalDescriptionUK, "frascati ne possède pas de description en anglais", "frascatis ne possèdent pas de description en anglais")}
        `;
        const blob = new Blob([data], { type: "text/plain" });
        saveAs(blob, "frascati_statistiques.txt");
    };

    const downloadExcelFile = () => {
        const data = [
            ["Statistiques", "Valeurs"],
            ["Total Frascati", statistics.totalIdFrascati],
            ["Frascatis sans Nom", statistics.totalNom],
            ["Frascatis sans Nom UK", statistics.totalNomUK],
            ["Frascatis sans Description", statistics.totalDescription],
            ["Frascatis sans Description UK", statistics.totalDescriptionUK]
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Statistiques");
        XLSX.writeFile(workbook, "frascati_statistiques.xlsx");
    };

    return (
        <div className="container">
            <h2>Les statistiques des Frascati</h2>
            <p>Il y a {statistics.totalIdFrascati} Frascati au total.</p>
            <p>{generateText(statistics.totalNom, "frascati ne possède pas de nom", "frascatis ne possèdent pas de nom")}.</p>
            <p>{generateText(statistics.totalNomUK, "frascati ne possède pas de nom en anglais", "frascatis ne possèdent pas de nom en anglais")}.</p>
            <p>{generateText(statistics.totalDescription, "frascati ne possède pas de description", "frascatis ne possèdent pas de description")}.</p>
            <p>{generateText(statistics.totalDescriptionUK, "frascati ne possède pas de description en anglais", "frascatis ne possèdent pas de description en anglais")}.</p>

            <Button variant="primary" className="btn-custom" onClick={downloadTxtFile}>Télécharger en format texte</Button>
            <Button variant="primary" className="btn-custom" onClick={downloadExcelFile}>Télécharger en format Excel</Button>
        </div>
    );
}

export default FrascatiStat;
