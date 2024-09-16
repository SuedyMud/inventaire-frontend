import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getFrascatiDetail} from "../../utils/ApiGet.js";
import {Button} from "react-bootstrap";
import FrascatiSupprimer from "./FrascatiSupprimer.jsx";
import PermissionGuard from "../../utils/PermissionGuard.jsx";


function FrascatiDetail() {
    const {getAccessTokenSilently} = useAuth0();
    const {idfrascati} = useParams();
    const navigate = useNavigate();

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
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <h2>{frascati}</h2>

            <div>
                <p>(Code : {idfrascati})</p>
               {/* <p>Unité : </p>*/}

                <p>{description}</p>

               {/* <p>unité : {zufrascati}</p>*/}

                {/*<p> Ci-dessous, la liste des Unités de Recherche ayant déclaré ce domaine</p>*/}

                <PermissionGuard permission={'read:all-information:restricted-information'}>
                <div>
                    {/*<PermissionGuard permission={'write:information'}>*/}
                    <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/frascatiModifier/${idfrascati}`)}>
                        Modifier
                    </Button>

                    <div className="btn-custom">
                        <FrascatiSupprimer idfrascati={idfrascati} />
                    </div>
                    {/* </PermissionGuard>*/}

                </div>
                </PermissionGuard>
            </div>
        </>
    );
}

export default FrascatiDetail;
