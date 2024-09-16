import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import {getFacDetail, getFaculte} from "../../utils/ApiGet.js";
import React from "react";

function FaculteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { fac } = useParams();

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

    return (
        <>
            <div>
                {/* Si les champs sont définis, les afficher */}

                <h2>{faculte}</h2>
                <h2>{faculteUK}</h2>

                <p>(Code : {fac})</p>
            </div>
        </>
    );
}

export default FaculteDetail;
