import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { getFaculte } from "../../utils/ApiGet.js";
import React from "react";

function FaculteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { fac } = useParams();

    const { data: facultes, isLoading: isLoadingFaculte } = useQuery(["faculteDetail", fac], async () => {
        return getFaculte({ accessToken: await getAccessTokenSilently(), fac: fac });
    });

    if (isLoadingFaculte) {
        return <p>Loading...</p>;
    }

    // Vérifiez si 'facultes' contient des données
    if (!facultes || facultes.length === 0) {
        return <p>Aucune faculté trouvée</p>;
    }

    // Ajoutez une vérification pour l'objet facultes
    const faculteData = facultes[0]; // Assurez-vous que vous utilisez la bonne indexation si vous avez un tableau

    // Affichage dans la console pour déboguer
   /* console.log('Faculté:', faculteData?.faculte); // Utilisez l'opérateur de sécurité optionnel pour éviter les erreurs si les champs sont manquants
    console.log('FacultéUK:', faculteData?.faculteUK);*/

    return (
        <>
            <div>
                {/* Si les champs sont définis, les afficher */}
                <h2>{faculteData?.faculte || 'Nom de faculté non disponible'}</h2>
                <h2>{faculteData?.faculteUK || 'Nom de faculté (UK) non disponible'}</h2>
                <p>(Code : {fac})</p>
            </div>
        </>
    );
}

export default FaculteDetail;
