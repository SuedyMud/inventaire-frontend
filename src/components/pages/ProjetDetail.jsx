import { useAuth0 } from "@auth0/auth0-react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getProjetDetail} from "../../utils/ApiGet.js";


function ProjetDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const {idprojet} = useParams();


    const { data : projet, isLoading } = useQuery(["projetDetail", idprojet], async () => {
        return getProjetDetail({ accessToken : await getAccessTokenSilently(), idprojet: idprojet});
    });




    if (isLoading) {
        return <p>Loading...</p>;
    }

    if(!projet){
        return null;
    }

    const {nom, resume} = projet;

    return (
        <>
            <h2>{nom}</h2>

            <div>
                <p>Unité : </p>

                {resume ? (
                    <div>
                        <p>Description :</p>
                        <p>{resume}</p>
                    </div>
                ):(
                    <p> Pas de résumé disponible actuellement ! </p>
                )}

                <p>Liste des responsables : </p>
                <p>Liste des bailleurs : </p>
            </div>
        </>
    );
}

export default ProjetDetail;
