import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getUniteDetail, getResponsableUnite } from "../../utils/ApiGet.js";
import { Button } from "react-bootstrap";
import UniteSupprimer from "./UniteSupprimer.jsx";
import { FaEnvelope, FaFax, FaGlobe, FaHome, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function UniteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idunite } = useParams();
    const navigate = useNavigate();

    const { data: unite, isLoading: isLoadingUnite } = useQuery(["uniteDetail", idunite], async () => {
        return getUniteDetail({ accessToken: await getAccessTokenSilently(), idunite: idunite });
    });

    const { data: responsable, isLoading: isLoadingResponsable } = useQuery(["responsableUnite", idunite], async () => {
        return getResponsableUnite({ accessToken: await getAccessTokenSilently(), idunite: idunite });
    });

    if (isLoadingUnite || isLoadingResponsable) {
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

    // Construction de l'URL de Google Maps
    const address = `${rue} ${numero}, ${codePostal} ${localite}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    return (
        <>
            <h2>{nom}</h2>
            <div>
                <p>(Code : {idunite})</p>
                <p>Responsable de l'unité : {responsable ? `${responsable.nom} ${responsable.prenom}` : "Non défini"}</p>


                {/*<p> chercheur nom et prénom </p>*/}

                {description && (
                    <div>
                        <p>Description :</p>
                        <p>{description}</p>
                    </div>
                )}

                <hr />
                {localisation && <p><FaMapMarkerAlt /> Localisation : {localisation}</p>}
                {rue && numero && localite && (
                    <p><FaHome /> Adresse : <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">{rue} {numero}, {codePostal ? `${codePostal} ` : ''}{localite}</a></p>
                )}
                {email && <p><FaEnvelope /> Email : <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a></p>}
                {telephone && <p><FaPhone /> Téléphone : {telephone}</p>}
                {fax && <p><FaFax /> Fax : {fax}</p>}
                {site1 && <p><FaGlobe /> Site Web : <a href={site1} target="_blank" rel="noopener noreferrer">{site1}</a></p>}
                {site2 && <p><FaGlobe /> Autre Site : <a href={site2} target="_blank" rel="noopener noreferrer">{site2}</a></p>}

                <h5>Domaines Frascati :</h5>
                <h5>Disciplines CRef :</h5>

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
