import {useNavigate, useParams} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone} from "react-icons/fa";
import {Button, Spinner} from "react-bootstrap";
import ChercheurSupprimer from "./ChercheurSupprimer.jsx";
import {useQuery} from "react-query";
import {getChercheurDetail} from "../../utils/ApiGet.js";
import React from "react";
import PermissionGuard from "../../utils/PermissionGuard.jsx";

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

    const { nom, prenom, telephone, cpi, site, email} = chercheur;

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <h3>{prenom} {nom}</h3>
            <hr />
            {telephone && <p><FaPhone /> Téléphone : {telephone}</p>}
            {email && <p><FaEnvelope /> Email : <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a></p>}
            {site && <p><FaGlobe /> Site Web : <a href={site} target="_blank" rel="noopener noreferrer">{site}</a></p>}
            {cpi && <p><FaMapMarkerAlt /> Code postal interne : {cpi}</p>}

{/*
            <h5>Membres de l'unité :</h5>
            {membres && membres.length > 0 ? (
                <ul>
                    {membres.map((membre) => (
                        <li key={membre.idche}>
                            <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/chercheurDetail/${membre.idche}`)}>
                                {membre.nom} {membre.prenom}
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun membre trouvé pour cette unité.</p>
            )}*/}


            <div className=""> {/* Colonne prenant 3/12 de la largeur et alignée à droite */}
                <PermissionGuard permission={'write:all-information'}>
                    <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/chercheurModifier/${idche}`)}>
                        Modifier
                    </Button>
                    {/*<Button variant="danger" className="btn-custom" onClick={() => handleNavigation("/chercheurDelete")}>
                    Supprimer
                </Button>*/}

                    <div className="btn-custom">
                        {/* Affichage du composant ChercheurSupprimer pour la suppression */}
                        <ChercheurSupprimer idche={idche} />
                    </div>
                </PermissionGuard>

            </div>

        </div>
    );
}

export default ChercheurDetail;
