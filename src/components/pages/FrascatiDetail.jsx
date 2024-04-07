import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


function FrascatiDetail() {
    const {getAccessTokenSilently} = useAuth0();
    const {idfrascati} = useParams();
    const [frascati, setFrascati] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zfrascati/${idfrascati}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setFrascati(response.data);
                    /* console.log(setFrascati());*/
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [idfrascati, getAccessTokenSilently]);


    if (!frascati) {
        return null;
    }

    const {frascatiNom} = frascati;

    return (
        <>
            <h2>{frascatiNom}</h2>

            <div>
                <p>Unité : </p>

                <p> Ci-dessous, la liste des Unités de Recherche ayant déclaré ce domaine</p>
            </div>
        </>
    );
}

export default FrascatiDetail;
