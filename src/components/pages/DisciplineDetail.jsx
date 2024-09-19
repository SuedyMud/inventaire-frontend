import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import { getDiscplineDetail} from "../../utils/ApiGet.js";
import PermissionGuard from "../../utils/PermissionGuard.jsx";
import {Button} from "react-bootstrap";
import DisciplineSupprimer from "./DisciplineSupprimer.jsx";



function DisciplineDetail(){
    const { getAccessTokenSilently } = useAuth0();
    const { idcodecref} = useParams();
    const navigate = useNavigate();

    const { data: discipcref, isLoading: isLoadingDispline } = useQuery(["disciplineDetail", idcodecref], async () => {
        return getDiscplineDetail({ accessToken: await getAccessTokenSilently(), idcodecref: idcodecref });
    });



    if(isLoadingDispline )
    {
        return <p>Loading...</p>;
    }


    if(!discipcref){
        return null;
    }

    const { discipline, disciplineUK} = discipcref;
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <h2>{discipline}</h2>
            <h2>{disciplineUK}</h2>
            <>
                <p>(Code : {idcodecref})</p>

                <div>
                    <PermissionGuard permission={'write:all-information'}>
                        <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/disciplineModifier/${idcodecref}`)}>
                            Modifier
                        </Button>

                        <div className="btn-custom">
                            <DisciplineSupprimer idcodecref={idcodecref} />
                        </div>
                    </PermissionGuard>
                </div>

                <Button variant="outline-info" className="btn-custom" onClick={() => handleNavigation("/disciplineStat")}>
                    Statistique
                </Button>

                <Button variant="outline-secondary" className="btn-custom" onClick={() => handleNavigation("/disciplineStat")}>
                    Disciplines
                </Button>

            </>
        </>
    );
}
export default DisciplineDetail;

