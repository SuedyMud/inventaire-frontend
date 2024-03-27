import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";


function UniteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const {idunite} = useParams();
    const [data, setData] = useState(null);
    /*const [unite, setUnite]=useState(null);*/



    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`api/zunite/${idunite}`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log("ID du chercheur:", idunite);

                if (response.status === 200) {
                    setData(response.data);
                    console.log(response.data);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [idunite, getAccessTokenSilently]);


    const {description, fax, site, corps, dDig, email, site1} = data;

    return (
        <>
            <h2>Répertoire par Unité</h2>
            {data && (
                <div>
                    <p>Code: {idunite}</p>
                    <p>Description: {description}</p>
                    <p>Fax: {fax}</p>
                    <p>Site: {site}</p>
                    <p>Campus: {corps}</p>
                    <p>Adresse: {dDig}</p>
                    <p>Email: {email}</p>
                    <p>Site Web: {site1}</p>
                </div>
            )}
        </>
    );
}

export default UniteDetail;
