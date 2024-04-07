import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";


function ProjetDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const {idprojet} = useParams();
    const [projet, setProjet] = useState(null);


    useEffect(() => {
    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get(`/api/zprojet/${idprojet}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                setProjet(response.data);
            } else {
                console.error("Erreur lors de la récupération des données");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données : ", error);
        }
    };

        fetchData();
    }, [idprojet, getAccessTokenSilently]);


    if(!projet){
        return null;
    }

    const {nom, resume} = projet;

    return (
        <>
            <h2>{nom}</h2>


            <div>
                <p>Unité : </p>

                {resume && (
                    <div>
                        <p>Description :</p>
                        <p>{resume}</p>
                    </div>
                )}

                <p>Liste des responsables : </p>
                <p>Liste des bailleurs : </p>
            </div>
        </>
    );
}

export default ProjetDetail;
