import {useParams} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useQuery} from "react-query";
import {getFaculte} from "../../utils/ApiGet.js";
import React from "react";


function FaculteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { fac } = useParams();

    const { data: facultes, isLoading: isLoadingFaculte } = useQuery(["faculteDetail", fac], async () => {
        return getFaculte({ accessToken: await getAccessTokenSilently(), fac: fac });
    });

    if(isLoadingFaculte)
    {
        return <p>Loading...</p>;
    }


    if(!facultes){
        return null;
    }

    const { faculte, faculteUK} = facultes;
    return (
        <>
            <h2>{faculte}</h2>
            <h2>{faculteUK}</h2>
            <div>
                <p>(Code : {fac})</p>

                {/*<h5>Domaines Frascati :</h5>
                <h5>Disciplines CRef :</h5>*/}




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

   /* const { facId } = useParams();

    const links = {
        'G1': 'https://esp.ulb.be/fr/la-recherche/les-centres-de-recherche',
        'H': 'https://polytech.ulb.be/fr/recherche/sciences-de-l-ingenieur',
    };

    // Vérifiez si l'ID existe dans les liens, sinon affichez un lien par défaut
    const link = links[facId] || 'https://cvchercheurs.ulb.ac.be/Site/';

    // Renvoie le contenu correspondant au lien
    return (
        <div>
            <h2>Faculté détaillée</h2>
            <p>Contenu correspondant à l'ID : {fac}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">Lien vers les détails</a>
        </div>
    );*/
}

export default FaculteDetail;

