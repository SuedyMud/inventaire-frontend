import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

function DisciplineDetails() {
    const { getAccessTokenSilently } = useAuth0();
    const { type } = useParams();
    const [disciplines, setDisciplines] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get("/api/zdiscipcref/liste", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        size: 10000,
                    },
                });

                if (response.status === 200) {
                    const filteredData = response.data.content;

                    let filteredDisciplines;
                    switch (type) {
                        case "sans-nom":
                            filteredDisciplines = filteredData.filter((item) => item.discipline === "");
                            setTitle("Disciplines sans nom");
                            break;
                        case "sans-nom-uk":
                            filteredDisciplines = filteredData.filter((item) => item.disciplineUK === "");
                            setTitle("Disciplines sans nom en anglais");
                            break;
                        default:
                            filteredDisciplines = [];
                            setTitle("Détails des disciplines");
                    }

                    setDisciplines(filteredDisciplines);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently, type]);

    return (
        <div className="container">
            <h2>{title}</h2>
            <ul>
                {disciplines.map((discipline) => (
                    <li key={discipline.idcodecref}>
                        <Link to={`/disciplineDetail/${discipline.idcodecref}`}>
                            {discipline.discipline}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DisciplineDetails;
