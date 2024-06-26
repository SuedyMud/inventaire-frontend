import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getProjetDetail} from "../../utils/ApiGet.js";
import {Button} from "react-bootstrap";
import ProjetSupprimer from "./ProjetSupprimer.jsx";
import PermissionGuard from "../../utils/PermissionGuard.jsx";


function ProjetDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const {idprojet} = useParams();
    const navigate = useNavigate();


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

    const handleNavigation = (path) => {
        navigate(path);
    };

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

                <div>
                    <PermissionGuard permission={'write:all-information'}>
                        <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/projetModifier/${idprojet}`)}>
                            Modifier
                        </Button>

                       <div className="btn-custom">
                            <ProjetSupprimer idprojet={idprojet} />
                        </div>
                    </PermissionGuard>
                </div>
            </div>
        </>
    );
}

export default ProjetDetail;
