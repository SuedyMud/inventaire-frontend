import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";

function DisciplineStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalDisciplines: 0,
        totalNom: 0,
        totalNomUk: 0,
        totalDescription: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await axios.get("/api/zdiscipcref/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 10000, // Nombre d'éléments par page
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content;

                    const totalDisciplines = filteredData.length;

                    const statistics = {
                        totalDisciplines: totalDisciplines,
                        totalNom: filteredData.filter((item) => item.discipline === "").length,
                        totalNomUk: filteredData.filter((item) => item.disciplineUK === "").length,

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
Il y a ${statistics.totalDisciplines} disciplines au total
${generateText(statistics.totalNom, "discipline ne possède pas de nom", "disciplines ne possèdent pas de nom")}
${generateText(statistics.totalNomUk, "discipline ne possède pas de nom en anglais", "disciplines ne possèdent pas de nom en anglais")}

        `;
        const blob = new Blob([data], { type: "text/plain" });
        saveAs(blob, "discipline_statistiques.txt");
    };

    const downloadExcelFile = () => {
        const data = [
            ["Statistiques", "Valeurs"],
            ["Total Disciplines", statistics.totalDisciplines],
            ["Disciplines sans Nom", statistics.totalNom],
            ["Disciplines sans Nom UK", statistics.totalNomUk],

        ];
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Statistiques");
        XLSX.writeFile(workbook, "discipline_statistiques.xlsx");
    };

    return (
        <div className="container">
            <h2>Les statistiques des disciplines</h2>
            <p>Il y a {statistics.totalDisciplines} disciplines au total.</p>
            <p>{generateText(statistics.totalNom, "discipline ne possède pas de nom", "disciplines ne possèdent pas de nom")}.</p>
            <p>{generateText(statistics.totalNomUk, "discipline ne possède pas de nom en anglais", "disciplines ne possèdent pas de nom en anglais")}.</p>

            <Button variant="primary" className="btn-custom" onClick={downloadTxtFile}>Télécharger en format texte</Button>
            <Button variant="primary" className="btn-custom" onClick={downloadExcelFile}>Télécharger en format Excel</Button>
        </div>
    );
}

export default DisciplineStat;
