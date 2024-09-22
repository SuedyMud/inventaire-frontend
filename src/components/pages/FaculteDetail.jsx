import {useNavigate, useParams} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import {getFacDetail} from "../../utils/ApiGet.js";
import React from "react";
import PermissionGuard from "../../utils/PermissionGuard.jsx";
import {Button, Spinner} from "react-bootstrap";
import FrascatiSupprimer from "./FrascatiSupprimer.jsx";
import FaculteSupprimer from "./FaculteSupprimer.jsx";

function FaculteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { fac } = useParams();
    const navigate = useNavigate();

    const { data: facultes, isLoading: isLoadingFaculte } = useQuery(["faculteDetail", fac], async () => {
        return getFacDetail({ accessToken: await getAccessTokenSilently(), fac: fac });
    });

    if (isLoadingFaculte) {
        return <Spinner/>;
    }


    if (!facultes) {
        return <p>Aucune faculté trouvée.</p>;
    }


    const {faculte, faculteUK, sigle, cc,dmaj, actif, groupe} = facultes;

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div>
                {/* Si les champs sont définis, les afficher */}

                <h2>{faculte}</h2>
                <h2>{faculteUK}</h2>

                <p>(Code : {fac})</p>
                <p>Sigle : {sigle}</p>
                <p>Abréviation : {cc}</p>
                <p>Date de mise à jour : {dmaj === "0000-00-00 00:00:00.000000" || !dmaj ? "Indisponible" : new Date(dmaj).toLocaleDateString('fr-FR')}</p>


                <p>Actif : {actif > 0 ? "Oui" : "Non"}</p>

                <p>Groupe : {groupe}</p>

                <div>
                    <PermissionGuard permission={'write:all-information'}>
                        <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/faculteModifier/${fac}`)}>
                            Modifier
                        </Button>

                        <div className="btn-custom">
                            <FaculteSupprimer fac={fac} />
                        </div>
                    </PermissionGuard>

                    <Button variant="outline-info" className="btn-custom" onClick={() => handleNavigation("/faculteStat")}>
                        Statistique
                    </Button>

                    <Button variant="outline-secondary" className="btn-custom" onClick={() => handleNavigation("/faculte")}>
                        Facultés
                    </Button>
                </div>


            </div>
        </>
    );
}

export default FaculteDetail;
