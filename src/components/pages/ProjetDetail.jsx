import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProjetDetail, getUnitesByProjet, getResponsablesByProjet, getChercheursByProjet } from "../../utils/ApiGet.js";
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
        return getProjetDetail({ accessToken: await getAccessTokenSilently(), idprojet });
    });

    // Récupérer les unités associées au projet
    const { data: unites, isLoading: isLoadingUnites } = useQuery(["unitesByProjet", idprojet], async () => {
        return getUnitesByProjet({ accessToken: await getAccessTokenSilently(), idprojet });
    });

    // Utilisation de la première unité (si présente) pour récupérer les responsables et les chercheurs
    const idunite = unites && unites.length > 0 ? unites[0].idunite : null;

    // Récupérer les responsables associés au projet
    const { data: responsables, isLoading: isLoadingResponsables } = useQuery(
        ["responsablesByProjet", idunite, idprojet],
        async () => {
            if (idunite) {
                return getResponsablesByProjet({ accessToken: await getAccessTokenSilently(), idunite, idprojet });
            }
            return [];
        },
        { enabled: !!idunite } // Ne lance la requête que si `idunite` est défini
    );

    // Récupérer les membres (chercheurs) associés au projet
    const { data: chercheurs, isLoading: isLoadingChercheurs } = useQuery(
        ["chercheursByProjet", idunite, idprojet],
        async () => {
            if (idunite) {
                return getChercheursByProjet({ accessToken: await getAccessTokenSilently(), idunite, idprojet });
            }
            return [];
        },
        { enabled: !!idunite } // Ne lance la requête que si `idunite` est défini
    );

    if (isLoadingProjet || isLoadingUnites || isLoadingResponsables || isLoadingChercheurs) {
        return <p>Chargement...</p>;
    }

    if (!projet) {
        return <p>Projet non trouvé.</p>;
    }

    const { nom, resume } = projet;

    const handleNavigation = (path) => {
        navigate(path);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Limitation du résumé à 650 caractères si nécessaire
    const shortDescription = resume && resume.length > 650 ? `${resume.substring(0, 650)}...` : resume;

    return (
        <>
            <h2>{nom}</h2>
            <div>
                <p>Unité :</p>

                {unites && unites.length > 0 ? (
                    <ul>
                        {unites.map((unite) => (
                            unite ? (
                            <li key={unite.idunite}>
                                <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/uniteDetail/${unite.idunite}`)}>
                                    {unite.nom} | {unite.idunite}
                                </Button>
                            </li>
                        ) : (
                            <li key={Math.random()}>Unite non trouvé ou supprimé !</li>
                )
                        ))}
                    </ul>
                ) : (
                    <p>Aucune unité associée à ce projet.</p>
                )}

                {resume ? (
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

                <div>
                    <PermissionGuard permission={'write:all-information'}>
                        <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/projetModifier/${idprojet}`)}>
                            Modifier
                        </Button>

                        <div className="btn-custom">
                            <ProjetSupprimer idprojet={idprojet} />
                        </div>
                    </PermissionGuard>
                    {/*<Button variant="outline-info" className="btn-custom" onClick={() => handleNavigation(`/projet-details/${idprojet}`)}>
                        Retour
                    </Button>*/}

                </div>
            </div>
        </>
    );
}

export default ProjetDetail;
