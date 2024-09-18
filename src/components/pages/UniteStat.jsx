import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver'; // Pour le téléchargement TXT
import * as XLSX from 'xlsx'; // Pour le téléchargement Excel
import { Button } from 'react-bootstrap';

function UniteStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalUnites: 0,
        unitesSansNom: [],
        unitesSansNomUk: [],
        unitesSansDescription: [],
        unitesSansLocalite: [],
        unitesSansTelephone: [],
        unitesSansFax: [],
        unitesSansRue: [],
        unitesSansEmail: [],
        unitesSansSite1: [],
        unitesSansSite2: [],
        unitesSansRemarque: [],
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

                    setStatistics({
                        totalUnites: filteredData.length,
                        unitesSansNom: filteredData.filter((item) => item.nom === ""),
                        unitesSansNomUk: filteredData.filter((item) => item.nomUK === ""),
                        unitesSansDescription: filteredData.filter((item) => item.description === ""),
                        unitesSansLocalite: filteredData.filter((item) => item.localite === ""),
                        unitesSansTelephone: filteredData.filter((item) => item.telephone === ""),
                        unitesSansFax: filteredData.filter((item) => item.fax === "" || item.fax === "NEANT"),
                        unitesSansRue: filteredData.filter((item) => item.rue === ""),
                        unitesSansEmail: filteredData.filter((item) => item.email === ""),
                        unitesSansSite1: filteredData.filter((item) => item.site1 === ""),
                        unitesSansSite2: filteredData.filter((item) => item.site2 === ""),
                        unitesSansRemarque: filteredData.filter((item) => item.remarque === ""),
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
Il y a ${statistics.totalUnites} unités au total.
Unités sans nom : ${statistics.unitesSansNom.length}
Unités sans nom en anglais : ${statistics.unitesSansNomUk.length}
Unités sans description : ${statistics.unitesSansDescription.length}
Unités sans localité spécifiée : ${statistics.unitesSansLocalite.length}
Unités sans numéro de téléphone : ${statistics.unitesSansTelephone.length}
Unités sans fax : ${statistics.unitesSansFax.length}
Unités sans adresse physique : ${statistics.unitesSansRue.length}
Unités sans email : ${statistics.unitesSansEmail.length}
Unités sans site internet : ${statistics.unitesSansSite1.length}
Unités sans deuxième site internet : ${statistics.unitesSansSite2.length}
Unités sans remarque : ${statistics.unitesSansRemarque.length}
        `;
        const blob = new Blob([data], { type: 'text/plain' });
        saveAs(blob, 'unite_statistiques.txt');
    };

    const generateExcelFile = () => {
        const data = [
            ['Catégorie', 'Nombre'],
            ['Unités sans nom', statistics.unitesSansNom.length],
            ['Unités sans nom en anglais', statistics.unitesSansNomUk.length],
            ['Unités sans description', statistics.unitesSansDescription.length],
            ['Unités sans localité', statistics.unitesSansLocalite.length],
            ['Unités sans téléphone', statistics.unitesSansTelephone.length],
            ['Unités sans fax', statistics.unitesSansFax.length],
            ['Unités sans rue', statistics.unitesSansRue.length],
            ['Unités sans email', statistics.unitesSansEmail.length],
            ['Unités sans site internet', statistics.unitesSansSite1.length],
            ['Unités sans deuxième site internet', statistics.unitesSansSite2.length],
            ['Unités sans remarque', statistics.unitesSansRemarque.length],
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Statistiques');
        XLSX.writeFile(workbook, 'unite_statistiques.xlsx');
    };

    return (
        <div className="container">
            <h2>Les statistiques des unités</h2>
            <p>Total des unités : {statistics.totalUnites}</p>

            <ul>
                <li>
                    <Link to="/unite-details/sans-nom">Unités sans nom ({statistics.unitesSansNom.length})</Link>
                </li>
                <li>
                    <Link to="/unite-details/sans-nom-uk">Unités sans nom en anglais ({statistics.unitesSansNomUk.length})</Link>
                </li>
                <li>
                    <Link to="/unite-details/sans-description">Unités sans description ({statistics.unitesSansDescription.length})</Link>
                </li>
                <li>
                    <Link to="/unite-details/sans-localite">Unités sans localité ({statistics.unitesSansLocalite.length})</Link>
                </li>
                <li>
                    <Link to="/unite-details/sans-telephone">Unités sans téléphone ({statistics.unitesSansTelephone.length})</Link>
                </li>
                <li>
                    <Link to="/unite-details/sans-fax">Unités sans fax ({statistics.unitesSansFax.length})</Link>
                </li>
                <li>
                    <Link to="/unite-details/sans-rue">Unités sans adresse physique ({statistics.unitesSansRue.length})</Link>
                </li>
                <li>
                    <Link to="/unite-details/sans-email">Unités sans email ({statistics.unitesSansEmail.length})</Link>
                </li>
            </ul>

            <button onClick={generateTextFile} className="btn-custom btn btn-primary">Télécharger en TXT</button>
            <button onClick={generateExcelFile} className="btn-custom btn btn-primary">Télécharger en Excel</button>
        </div>
    );
}

export default UniteStat;
