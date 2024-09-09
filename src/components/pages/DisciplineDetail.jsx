import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getDisciplinesByUnite, getDiscplineDetail} from "../../utils/ApiGet.js";
import {Button} from "react-bootstrap";



function DisciplineDetail(){
    const { getAccessTokenSilently } = useAuth0();
    const { idcodecref, idunite  } = useParams();
    const navigate = useNavigate();

    const { data: discipcref, isLoading: isLoadingDispline } = useQuery(["disciplineDetail", idcodecref], async () => {
        return getDiscplineDetail({ accessToken: await getAccessTokenSilently(), idcodecref: idcodecref });
    });

    const { data: disciplines, isLoading: isLoadingDisciplines } = useQuery(["disciplinesByUnite", idunite], async () => {
        return getDisciplinesByUnite({ accessToken: await getAccessTokenSilently(), idunite: idunite });
    });

    if(isLoadingDispline || isLoadingDisciplines)
    {
        return <p>Loading...</p>;
    }


    if(!discipcref){
        return null;
    }

    const { discipline, disciplineUk} = discipcref;

    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <>
            <h2>{discipline}</h2>
            <h2>{disciplineUk}</h2>
            <div>
                <p>(Code : {idcodecref})</p>

                <h5>Domaines Frascati :</h5>
                <h5>Disciplines CRef :</h5>
                <ul>
                    {disciplines.map((d, index) => (
                        <li key={`${d.idcodecref}-${index}`}> {/* Utilisation d'une clé composée pour garantir l'unicité */}
                            <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/disciplineDetail/${d.idcodecref}`)}>
                                {d.discipline}
                            </Button>
                        </li>
                    ))}
                </ul>



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

