import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getFrascatiDetail, getUniteDetail} from "../../utils/ApiGet.js";


function FrascatiDetail() {
    const {getAccessTokenSilently} = useAuth0();
    const {idfrascati} = useParams();

    const { data: zfrascati, isLoading: isLoadingUnite } = useQuery(["frascatiDetail", idfrascati], async () => {
        return getFrascatiDetail({ accessToken: await getAccessTokenSilently(), idfrascati: idfrascati });
    });

    if (isLoadingUnite /*|| isLoadingResponsable*/) {
        return <p>Loading...</p>;
    }

    if (!zfrascati) {
        return null;
    }

    const {frascati, description} = zfrascati;

    return (
        <>
            <h2>{frascati}</h2>

            <div>
                <p>(Code : {idfrascati})</p>
               {/* <p>Unité : </p>*/}

                <p>{description}</p>

                <p> Ci-dessous, la liste des Unités de Recherche ayant déclaré ce domaine</p>

            </div>
        </>
    );
}

export default FrascatiDetail;
