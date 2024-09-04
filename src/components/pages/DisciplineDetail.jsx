import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getDiscplineDetail} from "../../utils/ApiGet.js";



function DisciplineDetail(){
    const { getAccessTokenSilently } = useAuth0();
    const { idcodecref } = useParams();

    const { data: discipcref, isLoading: isLoadingDispline } = useQuery(["disciplineDetail", idcodecref], async () => {
        return getDiscplineDetail({ accessToken: await getAccessTokenSilently(), idcodecref: idcodecref });
    });

    if(isLoadingDispline)
    {
        return <p>Loading...</p>;
    }


    if(!discipcref){
        return null;
    }

    const { discipline, disciplineUk} = discipcref;
    return (
        <>
            <h2>{discipline}</h2>
            <h2>{disciplineUk}</h2>
            <div>
                <p>(Code : {idcodecref})</p>

                <h5>Domaines Frascati :</h5>
                <h5>Disciplines CRef :</h5>




                <div>
                    {/*<PermissionGuard permission={'write:information'}>
                    <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/uniteModifier/${idunite}`)}>
                        Modifier
                    </Button>

                    <div className="btn-custom">
                        <UniteSupprimer idunite={idunite} />
                    </div>
                     </PermissionGuard>*/}
                </div>
            </div>
        </>
    );
}
export default DisciplineDetail;

