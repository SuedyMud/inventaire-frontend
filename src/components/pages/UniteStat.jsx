import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";

function UniteStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalUnites: 0,
        totalNomUk: 0,
        totalDescription: 0,
        totalLocalite: 0,
        totalTelephone: 0,
        totalFax: 0,
        totalRue: 0,
        totalEmail: 0,
        totalSite1: 0,
        totalSite2: 0,
        totalRemarque: 0,
        totalUniteProjets: 0,
        moyenneProjetsParUnite: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await axios.get("/api/zunite/liste", {
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

                    const totalUnites = filteredData.length;

                    const statistics = {
                        totalUnites: totalUnites,
                        totalNomUk: filteredData.filter((item) => item.nomUK === "").length,
                        totalDescription: filteredData.filter((item) => item.description === "").length,
                        totalLocalite: filteredData.filter((item) => item.localite === "").length,
                        totalTelephone: filteredData.filter((item) => item.telephone === "").length,
                        totalFax: filteredData.filter((item) => item.fax === "" || item.fax === "NEANT").length,
                        totalRue: filteredData.filter((item) => item.rue === "").length,
                        totalEmail: filteredData.filter((item) => item.email === "").length,
                        totalSite1: filteredData.filter((item) => item.site1 === "").length,
                        totalSite2: filteredData.filter((item) => item.site2 === "").length,
                        totalRemarque: filteredData.filter((item) => item.remarque === "").length,
                        totalUniteProjets: filteredData.length,
                        moyenneProjetsParUnite: totalUnites > 0 ? filteredData.length / totalUnites : 0,
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
Il y a ${statistics.totalUnites} unités au total
${generateText(statistics.totalNomUk, "unité ne possède pas de nom en anglais", "unités ne possèdent pas de nom en anglais")}
${generateText(statistics.totalDescription, "unité ne possède pas de description", "unités ne possèdent pas de description")}
${generateText(statistics.totalLocalite, "unité ne possède pas de localité spécifiée", "unités ne possèdent pas de localité spécifiée")}
${generateText(statistics.totalTelephone, "unité ne possède pas de numéro de téléphone", "unités ne possèdent pas de numéro de téléphone")}
${generateText(statistics.totalFax, "unité ne possède pas de fax", "unités ne possèdent pas de fax")}
${generateText(statistics.totalRue, "unité ne possède pas d'adresse physique", "unités ne possèdent pas d'adresse physique")}
${generateText(statistics.totalEmail, "unité ne possède pas d'adresse e-mail", "unités ne possèdent pas d'adresse e-mail")}
${generateText(statistics.totalSite1, "unité ne possède pas de site internet", "unités ne possèdent pas de site internet")}
${generateText(statistics.totalSite2, "unité ne possède pas de deuxième site internet", "unités ne possèdent pas de deuxième site internet")}
${generateText(statistics.totalRemarque, "unité ne comporte pas de remarque", "unités ne comportent pas de remarque")}
Voici le nombre de projets par unité : ${statistics.totalUniteProjets} avec une moyenne de projets par unité de ${statistics.moyenneProjetsParUnite}
        `;
        const blob = new Blob([data], { type: "text/plain" });
        saveAs(blob, "unite_statistiques.txt");
    };

    const downloadExcelFile = () => {
        const data = [
            ["Statistiques", "Valeurs"],
            ["Total Unités", statistics.totalUnites],
            ["Unités sans Nom UK", statistics.totalNomUk],
            ["Unités sans Description", statistics.totalDescription],
            ["Unités sans Localité", statistics.totalLocalite],
            ["Unités sans Téléphone", statistics.totalTelephone],
            ["Unités sans Fax", statistics.totalFax],
            ["Unités sans Rue", statistics.totalRue],
            ["Unités sans Email", statistics.totalEmail],
            ["Unités sans Site1", statistics.totalSite1],
            ["Unités sans Site2", statistics.totalSite2],
            ["Unités sans Remarque", statistics.totalRemarque],
            ["Total Unité Projets", statistics.totalUniteProjets],
            ["Moyenne Projets par Unité", statistics.moyenneProjetsParUnite],
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Statistiques");
        XLSX.writeFile(workbook, "unite_statistiques.xlsx");
    };

    return (
        <div className="container">
            <h2>Les statistiques des unités</h2>
            <p>Il y a {statistics.totalUnites} unités au total.</p>
            <p>{generateText(statistics.totalNomUk, "unité ne possède pas de nom en anglais", "unités ne possèdent pas de nom en anglais")}.</p>
            <p>{generateText(statistics.totalDescription, "unité ne possède pas de description", "unités ne possèdent pas de description")}.</p>
            <p>{generateText(statistics.totalLocalite, "unité ne possède pas de localité spécifiée", "unités ne possèdent pas de localité spécifiée")}.</p>
            <p>{generateText(statistics.totalTelephone, "unité ne possède pas de numéro de téléphone", "unités ne possèdent pas de numéro de téléphone")}.</p>
            <p>{generateText(statistics.totalFax, "unité ne possède pas de fax", "unités ne possèdent pas de fax")}.</p>
            <p>{generateText(statistics.totalRue, "unité ne possède pas d'adresse physique", "unités ne possèdent pas d'adresse physique")}.</p>
            <p>{generateText(statistics.totalEmail, "unité ne possède pas d'adresse e-mail", "unités ne possèdent pas d'adresse e-mail")}.</p>
            <p>{generateText(statistics.totalSite1, "unité ne possède pas de site internet", "unités ne possèdent pas de site internet")}.</p>
            <p>{generateText(statistics.totalSite2, "unité ne possède pas de deuxième site internet", "unités ne possèdent pas de deuxième site internet")}.</p>
            <p>{generateText(statistics.totalRemarque, "unité ne comporte pas de remarque", "unités ne comportent pas de remarque")}.</p>
            <p>Voici le nombre de projets par unité : {statistics.totalUniteProjets} avec une moyenne de projets par unité de {statistics.moyenneProjetsParUnite}.</p>

            <Button variant="primary" className="btn-custom" onClick={downloadTxtFile}>Télécharger en format texte</Button>
            <Button variant="primary" className="btn-custom" onClick={downloadExcelFile}>Télécharger en format Excel</Button>
        </div>
    );
}

export default UniteStat;
