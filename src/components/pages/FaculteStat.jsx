import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";

function FaculteStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalFacultes: 0,
        totalFaculteUk: 0,
        totalSigles: 0,
        totalDateMajs: 0,
        totalTactifs: 0,
        totalGroupes: 0,
        pourcentage: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("/api/zfac/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
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

                    const statistics = {
                        totalFacultes: totalFacultes,
                        totalFaculteUk: filteredData.filter((item) => item.faculteUK === "").length,
                        totalSigles: filteredData.filter((item) => item.sigle !== "IEE").length,
                        totalDateMajs: filteredData.filter((item) => item.dmaj === null).length,
                        totalTactifs: filteredData.filter((item) => item.actif !== 1).length,
                        totalGroupes: filteredData.filter((item) => item.groupe !== "PoLE SANTÉ").length,
                        pourcentage: ((filteredData.filter((item) => item.faculteUK === "").length / totalFacultes) * 100).toFixed(0),
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
Il y a ${statistics.totalFacultes} facultés au total
${generateText(statistics.totalFaculteUk, "faculté ne possède pas de nom en anglais", "facultés ne possèdent pas de nom en anglais")} (${statistics.pourcentage}%)
${generateText(statistics.totalSigles, "faculté ne provient pas de l'Institut d'Enseignement Interfacultaire", "facultés ne proviennent pas de l'Institut d'Enseignement Interfacultaire")}
${generateText(statistics.totalDateMajs, "faculté ne possède pas de date de mise à jour", "facultés ne possèdent pas de date de mise à jour")}
${generateText(statistics.totalTactifs, "faculté n'est pas active", "facultés ne sont pas actives")}
${generateText(statistics.totalGroupes, "faculté ne provient pas du PoLE SANTÉ", "facultés ne proviennent pas du PoLE SANTÉ")}
        `;
        const blob = new Blob([data], { type: "text/plain" });
        saveAs(blob, "faculte_statistiques.txt");
    };

    const downloadExcelFile = () => {
        const data = [
            ["Statistiques", "Valeurs"],
            ["Total Facultés", statistics.totalFacultes],
            ["Facultés sans Nom UK", statistics.totalFaculteUk],
            ["Facultés sans Sigle IEE", statistics.totalSigles],
            ["Facultés sans Date de Mise à Jour", statistics.totalDateMajs],
            ["Facultés Inactives", statistics.totalTactifs],
            ["Facultés sans Groupe PoLE SANTÉ", statistics.totalGroupes],
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Statistiques");
        XLSX.writeFile(workbook, "faculte_statistiques.xlsx");
    };

    return (
        <div className="container">
            <h2>Les statistiques des facultés</h2>
            <p>{generateText(statistics.totalFacultes, "faculté au total", "facultés au total")}</p>
            <p>{generateText(statistics.totalFaculteUk, "faculté ne possède pas de nom en anglais", "facultés ne possèdent pas de nom en anglais")} ({statistics.pourcentage}%)</p>
            <p>{generateText(statistics.totalSigles, "faculté ne provient pas de l'Institut d'Enseignement Interfacultaire", "facultés ne proviennent pas de l'Institut d'Enseignement Interfacultaire")}</p>
            <p>{generateText(statistics.totalDateMajs, "faculté ne possède pas de date de mise à jour", "facultés ne possèdent pas de date de mise à jour")}</p>
            <p>{generateText(statistics.totalTactifs, "faculté n'est pas active", "facultés ne sont pas actives")}</p>
            <p>{generateText(statistics.totalGroupes, "faculté ne provient pas du PoLE SANTÉ", "facultés ne proviennent pas du PoLE SANTÉ")}</p>

            <Button variant="primary" className="btn-custom" onClick={downloadTxtFile}>Télécharger en format texte</Button>
            <Button variant="primary" className="btn-custom" onClick={downloadExcelFile}>Télécharger en format Excel</Button>
        </div>
    );
}

export default FaculteStat;
