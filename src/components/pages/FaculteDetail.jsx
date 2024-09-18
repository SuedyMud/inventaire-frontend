import {useNavigate, useParams} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import {getFacDetail} from "../../utils/ApiGet.js";
import React from "react";
import PermissionGuard from "../../utils/PermissionGuard.jsx";
import {Button} from "react-bootstrap";
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
        return <p>Loading...</p>;
    }

    // Vérifiez si 'facultes' contient des données
    if (!facultes) {
        return null;
    }


    const {faculte, faculteUK} = facultes;

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

                <div>
                    <PermissionGuard permission={'write:all-information'}>
                        <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/faculteModifier/${fac}`)}>
                            Modifier
                        </Button>

                        <div className="btn-custom">
                            <FaculteSupprimer fac={fac} />
                        </div>
                    </PermissionGuard>
                </div>


            </div>
        </>
    );
}

export default FaculteDetail;
