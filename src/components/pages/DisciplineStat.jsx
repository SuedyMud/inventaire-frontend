import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver'; // Pour le téléchargement TXT
import * as XLSX from 'xlsx'; // Pour le téléchargement Excel
import { Button } from 'react-bootstrap';

function DisciplineStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalDisciplines: 0,
        disciplinesSansNom: [],
        disciplinesSansNomUK: []
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

                    setStatistics({
                        totalDisciplines: filteredData.length,
                        disciplinesSansNom: filteredData.filter((item) => item.discipline === ""),
                        disciplinesSansNomUK: filteredData.filter((item) => item.disciplineUK === "")
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
Il y a ${statistics.totalDisciplines} disciplines au total.
Disciplines sans nom : ${statistics.disciplinesSansNom.length}
Disciplines sans nom en anglais : ${statistics.disciplinesSansNomUK.length}
        `;
        const blob = new Blob([data], { type: 'text/plain' });
        saveAs(blob, 'discipline_statistiques.txt');
    };

    const generateExcelFile = () => {
        const data = [
            ['Catégorie', 'Nombre'],
            ['Disciplines sans nom', statistics.disciplinesSansNom.length],
            ['Disciplines sans nom en anglais', statistics.disciplinesSansNomUK.length]
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Statistiques');
        XLSX.writeFile(workbook, 'discipline_statistiques.xlsx');
    };

    return (
        <div className="container">
            <h2>Les statistiques des disciplines</h2>
            <p>Total des disciplines : {statistics.totalDisciplines}</p>

            <ul>
                <li>
                    <Link to="/discipline-details/sans-nom">Disciplines sans nom ({statistics.disciplinesSansNom.length})</Link>
                </li>
                <li>
                    <Link to="/discipline-details/sans-nom-uk">Disciplines sans nom en anglais ({statistics.disciplinesSansNomUK.length})</Link>
                </li>
            </ul>

            <Button onClick={generateTextFile} className="btn-custom primary">Télécharger en TXT</Button>
            <Button onClick={generateExcelFile} className="btn-custom primary">Télécharger en Excel</Button>
        </div>
    );
}

export default DisciplineStat;
