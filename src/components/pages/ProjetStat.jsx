import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver'; // Pour le téléchargement TXT
import * as XLSX from 'xlsx'; // Pour le téléchargement Excel
import { Button } from 'react-bootstrap';

function ProjetStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalProjets: 0,
        projetsSansNom: [],
        projetsSansNomUk: [],
        projetsSansNomProgramme: [],
        projetsSansNomProgrammeUk: [],
        projetsSansResume: [],
        projetsSansResumeUk: [],
        projetsSansDateMaj: [],
        projetsSansSite: [],
        projetsSansUnite: []
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

                    setStatistics({
                        totalProjets: filteredData.length,
                        projetsSansNom: filteredData.filter((item) => item.nom === ""),
                        projetsSansNomUk: filteredData.filter((item) => item.nomUK === ""),
                        projetsSansNomProgramme: filteredData.filter((item) => item.nomprogramme === ""),
                        projetsSansNomProgrammeUk: filteredData.filter((item) => item.nomprogrammeUK === ""),
                        projetsSansResume: filteredData.filter((item) => item.resume === ""),
                        projetsSansResumeUk: filteredData.filter((item) => item.resumeUK === ""),
                        projetsSansDateMaj: filteredData.filter((item) => item.datemaj === ""),
                        projetsSansSite: filteredData.filter((item) => item.site === ""),
                        projetsSansUnite: filteredData.filter((item) => !item.refunite)
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
Il y a ${statistics.totalProjets} projets au total.
Projets sans nom : ${statistics.projetsSansNom.length}
Projets sans nom en anglais : ${statistics.projetsSansNomUk.length}
Projets sans nom de programme : ${statistics.projetsSansNomProgramme.length}
Projets sans nom de programme en anglais : ${statistics.projetsSansNomProgrammeUk.length}
Projets sans résumé : ${statistics.projetsSansResume.length}
Projets sans résumé en anglais : ${statistics.projetsSansResumeUk.length}
Projets sans date de mise à jour : ${statistics.projetsSansDateMaj.length}
Projets sans site internet : ${statistics.projetsSansSite.length}
Projets sans unité : ${statistics.projetsSansUnite.length}
        `;
        const blob = new Blob([data], { type: 'text/plain' });
        saveAs(blob, 'projet_statistiques.txt');
    };

    const generateExcelFile = () => {
        const data = [
            ['Catégorie', 'Nombre'],
            ['Projets sans nom', statistics.projetsSansNom.length],
            ['Projets sans nom en anglais', statistics.projetsSansNomUk.length],
            ['Projets sans nom de programme', statistics.projetsSansNomProgramme.length],
            ['Projets sans nom de programme en anglais', statistics.projetsSansNomProgrammeUk.length],
            ['Projets sans résumé', statistics.projetsSansResume.length],
            ['Projets sans résumé en anglais', statistics.projetsSansResumeUk.length],
            ['Projets sans date de mise à jour', statistics.projetsSansDateMaj.length],
            ['Projets sans site internet', statistics.projetsSansSite.length],
            ['Projets sans unité', statistics.projetsSansUnite.length],
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Statistiques');
        XLSX.writeFile(workbook, 'projet_statistiques.xlsx');
    };

    return (
        <div className="container">
            <h2>Les statistiques des projets</h2>
            <p>Total des projets : {statistics.totalProjets}</p>

            <ul>
                <li>
                    <Link to="/projet-details/sans-nom">Projets sans nom ({statistics.projetsSansNom.length})</Link>
                </li>
                <li>
                    <Link to="/projet-details/sans-nom-uk">Projets sans nom en anglais ({statistics.projetsSansNomUk.length})</Link>
                </li>
                <li>
                    <Link to="/projet-details/sans-nom-programme">Projets sans nom de programme ({statistics.projetsSansNomProgramme.length})</Link>
                </li>
                <li>
                    <Link to="/projet-details/sans-nom-programme-uk">Projets sans nom de programme en anglais ({statistics.projetsSansNomProgrammeUk.length})</Link>
                </li>
                <li>
                    <Link to="/projet-details/sans-resume">Projets sans résumé ({statistics.projetsSansResume.length})</Link>
                </li>
                <li>
                    <Link to="/projet-details/sans-resume-uk">Projets sans résumé en anglais ({statistics.projetsSansResumeUk.length})</Link>
                </li>
                <li>
                    <Link to="/projet-details/sans-datemaj">Projets sans date de mise à jour ({statistics.projetsSansDateMaj.length})</Link>
                </li>
                <li>
                    <Link to="/projet-details/sans-site">Projets sans site internet ({statistics.projetsSansSite.length})</Link>
                </li>
                <li>
                    <Link to="/projet-details/sans-unite">Projets sans unité ({statistics.projetsSansUnite.length})</Link>
                </li>
            </ul>

            <Button onClick={generateTextFile} className="btn-custom btn btn-primary">Télécharger en TXT</Button>
            <Button onClick={generateExcelFile} className="btn-custom btn btn-primary">Télécharger en Excel</Button>
        </div>
    );
}

export default ProjetStat;
