import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
    getUniteDetail,
    getResponsablesUnite,
    getFrascatiByUnite,
    getDisciplinesByUnite,
    getFaculteByUnite
} from "../../utils/ApiGet.js";
import { Button } from "react-bootstrap";
import UniteSupprimer from "./UniteSupprimer.jsx";
import { FaEnvelope, FaFax, FaGlobe, FaHome, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import PermissionGuard from "../../utils/PermissionGuard.jsx";

function UniteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idunite } = useParams();
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);

    const { data: unite, isLoading: isLoadingUnite } = useQuery(["uniteDetail", idunite], async () => {
        return getUniteDetail({ accessToken: await getAccessTokenSilently(), idunite: idunite });
    });

    const { data: responsables, isLoading: isLoadingResponsables } = useQuery(["responsablesUnite", idunite], async () => {
        return getResponsablesUnite({ accessToken: await getAccessTokenSilently(), idunite: idunite });
    });

    const { data: frascati, isLoading: isLoadingFrascati } = useQuery(["frascatiByUnite", idunite], async () => {
        return getFrascatiByUnite({ accessToken: await getAccessTokenSilently(), idunite: idunite });
    });

    const { data: disciplines, isLoading: isLoadingDisciplines } = useQuery(["disciplinesByUnite", idunite], async () => {
        return getDisciplinesByUnite({ accessToken: await getAccessTokenSilently(), idunite: idunite });
    });

    const { data: facultes, isLoading: isLoadingFaculte } = useQuery(["faculteByUnite", idunite], async () => {
        return getFaculteByUnite({ accessToken: await getAccessTokenSilently(), idunite: idunite });
    });

    if (isLoadingUnite || isLoadingResponsables || isLoadingFrascati || isLoadingDisciplines || isLoadingFaculte) {
        return <p>Loading...</p>;
    }

    if (!unite) {
        return null; // Ou vous pouvez retourner un composant de chargement ou un message d'attente
    }

    const { nom, description, localisation, rue, numero, codePostal, localite, email, telephone, fax, site1, site2 } = unite;

    const handleNavigation = (path) => {
        navigate(path);
    };

    const address = `${rue} ${numero}, ${codePostal} ${localite}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const shortDescription = description && description.length > 650 ? `${description.substring(0, 650)}...` : description;

    const uniqueResponsables = responsables && responsables.filter((responsable, index, self) =>
            index === self.findIndex((r) => (
                r.idche === responsable.idche
            ))
    );

    const responsablesLabel = uniqueResponsables && uniqueResponsables.length === 1 ? "Responsable de l'unité" : "Responsables de l'unité";

    return (
        <>
            <h2>{nom}</h2>
            <div>
                {facultes && facultes.length > 0 ? (
                    <ul>
                        {facultes.map((fa) => (
                            <li key={fa.fac}> {/* Utilisation d'une clé composée pour garantir l'unicité */}
                                <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/faculteDetail/${fa.fac}`)}>
                                    {fa.faculte}
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune faculté associé.</p>
                )}

                <p>(Code : {idunite})</p>

                <p>{responsablesLabel} :</p>
                {uniqueResponsables && uniqueResponsables.length > 0 ? (
                    <ul>
                        {uniqueResponsables.map(responsable => (
                            <li key={responsable.idche}>
                                <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/chercheurDetail/${responsable.idche}`)}>
                                    {responsable.nom} {responsable.prenom}
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun responsable trouvé pour cette unité.</p>
                )}

                {description ? (
                    <div>
                        <p>Description :</p>
                        <p>{showFullDescription ? description : shortDescription}</p>
                        {description.length > 650 && (
                            <Button variant="link" onClick={toggleDescription}>
                                {showFullDescription ? "Voir moins" : "Voir plus"}
                            </Button>
                        )}
                    </div>
                ) : (
                    <p>Pas de description disponible actuellement !</p>
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

                {frascati && frascati.length > 0 && (
                    <>
                        <h5>Domaines Frascati :</h5>
                        <ul>
                            {frascati.map((f, index) => (
                                <li key={`${f.idfrascati}-${index}`}> {/* Utilisation d'une clé composée pour garantir l'unicité */}
                                    <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/frascatiDetail/${f.idfrascati}`)}>
                                        {f.idfrascati} {f.frascati}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {disciplines && disciplines.length > 0 && (
                    <>
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
                    </>
                )}

                <div>
                    <PermissionGuard permission={'write:all-information'}>
                        <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/uniteModifier/${idunite}`)}>
                            Modifier
                        </Button>

                        <div className="btn-custom">
                            <UniteSupprimer idunite={idunite} />
                        </div>
                    </PermissionGuard>
                </div>
            </div>
        </>
    );
}

export default UniteDetail;
