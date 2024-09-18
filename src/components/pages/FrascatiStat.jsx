import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver'; // Pour le téléchargement TXT
import * as XLSX from 'xlsx'; // Pour le téléchargement Excel
import { Button } from 'react-bootstrap';

function FrascatiStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalFrascatis: 0,
        frascatisSansNom: [],
        frascatisSansNomUK: [],
        frascatisSansDescription: [],
        frascatisSansDescriptionUK: []
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
                        size: 10000,
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content;

                    setStatistics({
                        totalFrascatis: filteredData.length,
                        frascatisSansNom: filteredData.filter((item) => item.nom === ""),
                        frascatisSansNomUK: filteredData.filter((item) => item.nomUK === ""),
                        frascatisSansDescription: filteredData.filter((item) => item.description === ""),
                        frascatisSansDescriptionUK: filteredData.filter((item) => item.descriptionUK === "")
                    });
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently]);

    const generateTextFile = () => {
        const data = `
Il y a ${statistics.totalFrascatis} Frascatis au total.
Frascatis sans nom : ${statistics.frascatisSansNom.length}
Frascatis sans nom en anglais : ${statistics.frascatisSansNomUK.length}
Frascatis sans description : ${statistics.frascatisSansDescription.length}
Frascatis sans description en anglais : ${statistics.frascatisSansDescriptionUK.length}
        `;
        const blob = new Blob([data], { type: 'text/plain' });
        saveAs(blob, 'frascati_statistiques.txt');
    };

    const generateExcelFile = () => {
        const data = [
            ['Catégorie', 'Nombre'],
            ['Frascatis sans nom', statistics.frascatisSansNom.length],
            ['Frascatis sans nom en anglais', statistics.frascatisSansNomUK.length],
            ['Frascatis sans description', statistics.frascatisSansDescription.length],
            ['Frascatis sans description en anglais', statistics.frascatisSansDescriptionUK.length]
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Statistiques');
        XLSX.writeFile(workbook, 'frascati_statistiques.xlsx');
    };

    return (
        <div className="container">
            <h2>Les statistiques des Frascatis</h2>
            <p>Total des Frascatis : {statistics.totalFrascatis}</p>

            <ul>
                <li>
                    <Link to="/frascati-details/sans-nom">Frascatis sans nom ({statistics.frascatisSansNom.length})</Link>
                </li>
                <li>
                    <Link to="/frascati-details/sans-nom-uk">Frascatis sans nom en anglais ({statistics.frascatisSansNomUK.length})</Link>
                </li>
                <li>
                    <Link to="/frascati-details/sans-description">Frascatis sans description ({statistics.frascatisSansDescription.length})</Link>
                </li>
                <li>
                    <Link to="/frascati-details/sans-description-uk">Frascatis sans description en anglais ({statistics.frascatisSansDescriptionUK.length})</Link>
                </li>
            </ul>

            <Button onClick={generateTextFile} className="btn btn-primary">Télécharger en TXT</Button>
            <Button onClick={generateExcelFile} className="btn btn-primary">Télécharger en Excel</Button>
        </div>
    );
}

export default FrascatiStat;
