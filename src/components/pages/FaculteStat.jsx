import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {Link, useNavigate} from 'react-router-dom';
import { saveAs } from 'file-saver'; // Pour le téléchargement TXT
import * as XLSX from 'xlsx';
import {Button} from "react-bootstrap"; // Pour le téléchargement Excel

function FaculteStat() {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const [statistics, setStatistics] = useState({
        totalFacultes: 0,
        facultesSansNomUk: [],
        facultesSansSigleIee: [],
        facultesSansDateMaj: [],
        facultesInactives: [],
        facultesSansPoleSante: [],
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
                        (item) => item.actif === 1 && item.invent20 === 1
                    );

                    const totalFacultes = filteredData.length;
                    const facultesSansNomUk = filteredData.filter((item) => item.faculteUK === "");
                    const facultesSansSigleIee = filteredData.filter((item) => item.sigle !== "IEE");
                    const facultesSansDateMaj = filteredData.filter((item) => !item.dmaj);
                    const facultesInactives = filteredData.filter((item) => item.actif !== 1);
                    const facultesSansPoleSante = filteredData.filter((item) => item.groupe !== "PoLE SANTÉ");

                    setStatistics({
                        totalFacultes: totalFacultes,
                        facultesSansNomUk: facultesSansNomUk,
                        facultesSansSigleIee: facultesSansSigleIee,
                        facultesSansDateMaj: facultesSansDateMaj,
                        facultesInactives: facultesInactives,
                        facultesSansPoleSante: facultesSansPoleSante,
                        pourcentage: ((facultesSansNomUk.length / totalFacultes) * 100).toFixed(0),
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
Il y a ${statistics.totalFacultes} facultés au total.
Facultés sans nom en anglais : ${statistics.facultesSansNomUk.length}
Facultés sans sigle IEE : ${statistics.facultesSansSigleIee.length}
Facultés sans date de mise à jour : ${statistics.facultesSansDateMaj.length}
Facultés inactives : ${statistics.facultesInactives.length}
Facultés hors PoLE SANTÉ : ${statistics.facultesSansPoleSante.length}
        `;
        const blob = new Blob([data], { type: 'text/plain' });
        saveAs(blob, 'faculte_statistiques.txt');
    };

    const generateExcelFile = () => {
        const data = [
            ['Catégorie', 'Nombre'],
            ['Facultés sans nom en anglais', statistics.facultesSansNomUk.length],
            ['Facultés sans sigle IEE', statistics.facultesSansSigleIee.length],
            ['Facultés sans date de mise à jour', statistics.facultesSansDateMaj.length],
            ['Facultés inactives', statistics.facultesInactives.length],
            ['Facultés hors PoLE SANTÉ', statistics.facultesSansPoleSante.length],
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Statistiques');
        XLSX.writeFile(workbook, 'faculte_statistiques.xlsx');
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="container">
            <h2>Les statistiques des facultés</h2>
            <p>Total des facultés : {statistics.totalFacultes}</p>

            <ul>
                <li>
                    <Link to="/faculte-details/sans-nom-uk">Facultés sans nom en anglais ({statistics.facultesSansNomUk.length})</Link>
                </li>
                <li>
                    <Link to="/faculte-details/sans-sigle-iee">Facultés sans sigle IEE ({statistics.facultesSansSigleIee.length})</Link>
                </li>
                <li>
                    <Link to="/faculte-details/sans-date-maj">Facultés sans date de mise à jour ({statistics.facultesSansDateMaj.length})</Link>
                </li>
                <li>
                    <Link to="/faculte-details/inactives">Facultés inactives ({statistics.facultesInactives.length})</Link>
                </li>
                <li>
                    <Link to="/faculte-details/sans-pole-sante">Facultés hors PoLE SANTÉ ({statistics.facultesSansPoleSante.length})</Link>
                </li>
            </ul>

            <button onClick={generateTextFile} className=" btn-custom btn btn-primary">Télécharger en TXT</button>
            <button onClick={generateExcelFile} className="btn-custom  btn btn-primary">Télécharger en Excel</button>

            <Button variant="outline-secondary" className="btn-custom" onClick={() => handleNavigation("/faculte")}>
                Facultés
            </Button>
        </div>
    );
}

export default FaculteStat;
