import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getUniteDetail } from "../../utils/ApiGet.js";
import { Button } from "react-bootstrap";
import UniteSupprimer from "./UniteSupprimer.jsx";


function UniteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idunite } = useParams();
    const navigate = useNavigate();

    const { data: unite, isLoading: isLoadingUnite } = useQuery(["uniteDetail", idunite], async () => {
        return getUniteDetail({ accessToken: await getAccessTokenSilently(), idunite: idunite });
    });

    if (isLoadingUnite) {
        return <p>Loading...</p>;
    }

    if (!unite) {
        return null; // Ou vous pouvez retourner un composant de chargement ou un message d'attente
    }

    // Déstructuration des propriétés de l'objet unite
    const { nom, description, localisation, rue, numero, codePostal, localite, email, telephone, fax, site1, site2 } = unite;

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <h2>{nom}</h2>
            <div>
                <p>(Code : {idunite})</p>

                <p>Responsable de l'unité : </p>



                <p>{description}</p>

                <p>Localisation : {localisation}</p>
                <p>Adresse : {rue} {numero}, {codePostal} {localite}</p>
                <p>Email : <a href={`mailto:${email}`}>{email}</a></p>
                {telephone && <p>Téléphone : {telephone}</p>}
                {fax && <p>Fax : {fax}</p>}
                {site1 && <p>Site Web : <a href={site1}>{site1}</a></p>}
                {site2 && <p>Autre Site : <a href={site2}>{site2}</a></p>}

                <h5>Domaines Frascati : </h5>
                <h5>Disciplines CRef : </h5>

                <div>
                    <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/uniteModifier/${idunite}`)}>
                        Modifier
                    </Button>

                    <div className="btn-custom">
                        <UniteSupprimer idunite={idunite} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UniteDetail;
