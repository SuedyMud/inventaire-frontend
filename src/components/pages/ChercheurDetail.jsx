import {Link, useNavigate, useParams} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaEnvelope, FaGlobe, FaPhone } from "react-icons/fa";
import {Button, Spinner} from "react-bootstrap";
import ChercheurDelete from "./ChercheurDelete";
import {useQuery} from "react-query";
import {getChercheurDetail} from "../../utils/ApiGet.js";
import React from "react";

function ChercheurDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idche } = useParams();
    const navigate = useNavigate();

    const { data : chercheur, isLoading } = useQuery(["chercheurDetail", idche], async () => {
        return getChercheurDetail({ accessToken : await getAccessTokenSilently(), idche: idche});
    });


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!chercheur) {
            return <Spinner/>;
    }

    const { nom, prenom, telephone, cpi, site, email, campus } = chercheur;

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <h3>{prenom} {nom}</h3>
            <hr />
            <p><FaPhone /> Téléphone : {telephone}</p>
            <p><FaEnvelope /> Email : <a href={`mailto:${email}`}>{email}</a></p>
            <p><FaGlobe /> Site : <a href={site}>{site}</a></p>
            <p>CPI : {cpi}</p>
            <p>Campus : {campus}</p>

            <div className=""> {/* Colonne prenant 3/12 de la largeur et alignée à droite */}
                <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/chercheurModifier/${idche}`)}>
                    Modifier
                </Button>
                {/*<Button variant="danger" className="btn-custom" onClick={() => handleNavigation("/chercheurDelete")}>
                    Supprimer
                </Button>*/}

                <div className="btn-custom">
                    {/* Affichage du composant ChercheurDelete pour la suppression */}
                    <ChercheurDelete idche={idche} />
                </div>
            </div>

        </div>
    );
}

export default ChercheurDetail;
