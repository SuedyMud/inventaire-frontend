import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver'; // Pour le téléchargement TXT
import * as XLSX from 'xlsx'; // Pour le téléchargement Excel
import { Button } from 'react-bootstrap';

function ChercheurStat() {
    const { getAccessTokenSilently } = useAuth0();

    const [statistics, setStatistics] = useState({
        totalChercheurs: 0,
        chercheursSansTelephone: [],
        chercheursSansEmail: [],
        chercheursSansSite: []
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

                    setStatistics({
                        totalChercheurs: filteredData.length,
                        chercheursSansTelephone: filteredData.filter((item) => item.telephone === ""),
                        chercheursSansEmail: filteredData.filter((item) => item.email === ""),
                        chercheursSansSite: filteredData.filter((item) => item.site === "")
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
Il y a ${statistics.totalChercheurs} chercheurs au total.
Chercheurs sans téléphone : ${statistics.chercheursSansTelephone.length}
Chercheurs sans e-mail : ${statistics.chercheursSansEmail.length}
Chercheurs sans site web : ${statistics.chercheursSansSite.length}
        `;
        const blob = new Blob([data], { type: 'text/plain' });
        saveAs(blob, 'chercheur_statistiques.txt');
    };

    const generateExcelFile = () => {
        const data = [
            ['Catégorie', 'Nombre'],
            ['Chercheurs sans téléphone', statistics.chercheursSansTelephone.length],
            ['Chercheurs sans e-mail', statistics.chercheursSansEmail.length],
            ['Chercheurs sans site web', statistics.chercheursSansSite.length]
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Statistiques');
        XLSX.writeFile(workbook, 'chercheur_statistiques.xlsx');
    };

    return (
        <div className="container">
            <h2>Les statistiques des chercheurs</h2>
            <p>Total des chercheurs : {statistics.totalChercheurs}</p>

            <ul>
                <li>
                    <Link to="/chercheur-details/sans-telephone">Chercheurs sans téléphone ({statistics.chercheursSansTelephone.length})</Link>
                </li>
                <li>
                    <Link to="/chercheur-details/sans-email">Chercheurs sans e-mail ({statistics.chercheursSansEmail.length})</Link>
                </li>
                <li>
                    <Link to="/chercheur-details/sans-site">Chercheurs sans site web ({statistics.chercheursSansSite.length})</Link>
                </li>
            </ul>

            <Button onClick={generateTextFile} className="btn-custom btn btn-primary">Télécharger en TXT</Button>
            <Button onClick={generateExcelFile} className="btn-custom btn btn-primary">Télécharger en Excel</Button>
        </div>
    );
}

export default ChercheurStat;
