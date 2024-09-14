import React, { useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProjetDetail, getUnitesByProjet, getResponsablesByProjet, getChercheursByProjet } from "../../utils/ApiGet.js";  // Assurez-vous que les chemins sont corrects
import { Button } from "react-bootstrap";
import ProjetSupprimer from "./ProjetSupprimer.jsx";
import PermissionGuard from "../../utils/PermissionGuard.jsx";

function ProjetDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idprojet } = useParams();
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Récupérer les détails du projet
    const { data: projet, isLoading: isLoadingProjet } = useQuery(["projetDetail", idprojet], async () => {
        return getProjetDetail({ accessToken: await getAccessTokenSilently(), idprojet: idprojet });
    });

    // Récupérer les unités associées au projet
    const { data: unites, isLoading: isLoadingUnites } = useQuery(["unitesByProjet", idprojet], async () => {
        return getUnitesByProjet({ accessToken: await getAccessTokenSilently(), idprojet });
    });

    // Récupérer les responsables associés au projet
    const { data: responsables, isLoading: isLoadingResponsables } = useQuery(["responsablesByProjet", idprojet], async () => {
        return getResponsablesByProjet({ accessToken: await getAccessTokenSilently(), idunite: "ID_UNITE", idprojet });
    });

    // Récupérer les membres (chercheurs) associés au projet
    const { data: chercheurs, isLoading: isLoadingChercheurs } = useQuery(["chercheursByProjet", idprojet], async () => {
        return getChercheursByProjet({ accessToken: await getAccessTokenSilently(), idunite: "ID_UNITE", idprojet });
    });

    if (isLoadingProjet || isLoadingUnites || isLoadingResponsables || isLoadingChercheurs) {
        return <p>Chargement...</p>;
    }

    if (!projet) {
        return null;
    }

    const { nom, resume } = projet;

    const handleNavigation = (path) => {
        navigate(path);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    /*const shortDescription = resume && resume.length > 650 ? `${resume.substring(0, 650)}...` : resume;*/


    return (
        <>
            <h2>{nom}</h2>
            <div>
                <p>Unité :</p>

                {unites && unites.length > 0 ? (
                    <ul>
                        {unites.map((unite) => (
                            <li key={unite.idunite}>
                                <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/uniteDetail/${unite.idunite}`)}>
                                    {unite.nom} | {unite.idunite}
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune unité associée à ce projet.</p>
                )}

               {/* {resume ? (
                    <div>
                        <p>Description :</p>
                        <p>{showFullDescription ? resume : shortDescription}</p>
                        {resume.length > 650 && (
                            <Button variant="link" onClick={toggleDescription}>
                                {showFullDescription ? "Voir moins" : "Voir plus"}
                            </Button>
                        )}
                    </div>
                ) : (
                    <p>Pas de résumé disponible actuellement !</p>
                )}

                <p>Liste des responsables :</p>
                {responsables && responsables.length > 0 ? (
                    <ul>
                        {responsables.map((responsable) => (
                            <li key={responsable.idche}>
                                {responsable.nom} {responsable.prenom}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun responsable associé à ce projet.</p>
                )}

                <p>Liste des membres :</p>
                {chercheurs && chercheurs.length > 0 ? (
                    <ul>
                        {chercheurs.map((chercheur) => (
                            <li key={chercheur.idche}>
                                {chercheur.nom} {chercheur.prenom}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun membre associé à ce projet.</p>
                )}

                <p>Liste des bailleurs :</p>*/}

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