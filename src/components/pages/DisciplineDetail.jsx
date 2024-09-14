import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import { getDiscplineDetail} from "../../utils/ApiGet.js";



function DisciplineDetail(){
    const { getAccessTokenSilently } = useAuth0();
    const { idcodecref} = useParams();


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


    return (
        <>
            <h2>{discipline}</h2>
            <h2>{disciplineUK}</h2>
            <div>
                <p>(Code : {idcodecref})</p>

            </div>
        </>
    );
}
export default DisciplineDetail;

