import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
    getUniteDetail,
    getResponsablesUnite,
    getFrascatiByUnite,
    getDisciplinesByUnite,
    getFaculteByUnite,
    getProjetsByUnite,
    getMembresByUnite  // Importation de la fonction pour récupérer les membres
} from "../../utils/ApiGet.js";
import {Button, Spinner} from "react-bootstrap";
import UniteSupprimer from "./UniteSupprimer.jsx";
import { FaEnvelope, FaFax, FaGlobe, FaHome, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import PermissionGuard from "../../utils/PermissionGuard.jsx";

function UniteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idunite } = useParams();
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);


    const { data: unite, isLoading: isLoadingUnite } = useQuery(["uniteDetail", idunite], async () => {
        const accessToken = await getAccessTokenSilently();
        return getUniteDetail({ accessToken, idunite });
    });


    const { data: responsables, isLoading: isLoadingResponsables } = useQuery(["responsablesUnite", idunite], async () => {
        const accessToken = await getAccessTokenSilently();
        const allResponsables = await getResponsablesUnite({ accessToken, idunite });
        return allResponsables.filter((responsable, index, self) =>
            index === self.findIndex((r) => r.idche === responsable.idche)
        );
    });


    const { data: membres, isLoading: isLoadingMembres } = useQuery(["membresUnite", idunite], async () => {
        const accessToken = await getAccessTokenSilently();
        return getMembresByUnite({ accessToken, idunite });
    });


    const { data: frascati } = useQuery(["frascatiByUnite", idunite], async () => {
        const accessToken = await getAccessTokenSilently();
        return getFrascatiByUnite({ accessToken, idunite });
    });

    const { data: disciplines } = useQuery(["disciplinesByUnite", idunite], async () => {
        const accessToken = await getAccessTokenSilently();
        return getDisciplinesByUnite({ accessToken, idunite });
    });

    const { data: facultes } = useQuery(["faculteByUnite", idunite], async () => {
        const accessToken = await getAccessTokenSilently();
        return getFaculteByUnite({ accessToken, idunite });
    });

    const { data: projets } = useQuery(["projetsByUnite", idunite], async () => {
        const accessToken = await getAccessTokenSilently();
        return getProjetsByUnite({ accessToken, idunite });
    });


    if (isLoadingUnite || isLoadingResponsables || isLoadingMembres) {
        return <Spinner/>;
    }

    if (!unite) {
        return <p>Aucune unité trouvée.</p>;
    }

    const { nom, description, localisation, rue, numero, codePostal, localite, email, telephone, fax, site1, site2 } = unite;

    const shortDescription = description && description.length > 650 ? `${description.substring(0, 650)}...` : description;

    const toggleDescription = () => setShowFullDescription(!showFullDescription);

    const handleNavigation = (path) => navigate(path);

    const address = `${rue} ${numero}, ${codePostal} ${localite}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    return (
        <>
            <h2>{nom}</h2>
            <div>
                <p>(Code : {idunite})</p>

                {facultes && facultes.length > 0 ? (
                    <ul>
                        {facultes.map((fa) => (
                            <li key={fa.fac}>
                                <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/faculteDetail/${fa.fac}`)}>
                                    {fa.faculte}
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune faculté associée.</p>
                )}

                {responsables && responsables.length > 0 ? (
                    <>
                        <p>{responsables.length === 1 ? "Responsable de l'unité :" : "Responsables de l'unité :"}</p>
                        <ul>
                            {responsables.map(responsable => (
                                responsable ? (
                                    <li key={responsable.idche}>
                                        <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/chercheurDetail/${responsable.idche}`)}>
                                            {responsable.nom} {responsable.prenom}
                                        </Button>
                                    </li>
                                ) : (
                                    <li key={Math.random()}>Responsable non trouvé ou supprimé !</li>
                                )
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Aucun responsable trouvé dans cette unité.</p>
                )}

                {membres && membres.length > 0 ? (
                    <>
                        <p>{membres.length === 1 ? "Membre de l'unité :" : "Membres de l'unité :"}</p>
                        <ul>
                            {membres.map((membre) => (
                                membre ? (
                                    <li key={membre.idche}>
                                        <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/chercheurDetail/${membre.idche}`)}>
                                            {membre.nom} {membre.prenom}
                                        </Button>
                                    </li>
                                ) : (
                                    <li key={Math.random()}>Membre non trouvé ou supprimé !</li>
                                )
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Aucun membre trouvé dans cette unité.</p>
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
                    <p><FaHome /> Adresse : <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">{address}</a></p>
                )}
                {email && <p><FaEnvelope /> Email : <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a></p>}
                {telephone && <p><FaPhone /> Téléphone : {telephone}</p>}
                {fax && <p><FaFax /> Fax : {fax}</p>}
                {site1 && <p><FaGlobe /> Site Web : <a href={site1} target="_blank" rel="noopener noreferrer">{site1}</a></p>}
                {site2 && <p><FaGlobe /> Autre Site : <a href={site2} target="_blank" rel="noopener noreferrer">{site2}</a></p>}

                {projets && projets.length > 0 ? (
                    <>
                        <h5>{projets.length === 1 ? "Projet :" : "Projets :"}</h5>
                        <ul>
                            {projets.map((projet) => (
                                projet ? (
                                    <li key={projet.idprojet}>
                                        <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/projetDetail/${projet.idprojet}`)}>
                                            {projet.nom}
                                        </Button>
                                    </li>
                                ) : (
                                    <li key={Math.random()}>Projet non trouvé ou supprimé !</li>
                                )
                            ))}
                        </ul>
                    </>
                ) : null}

                {frascati && frascati.length > 0 ? (
                    <>
                        <h5>{frascati.length === 1 ? "Domaine Frascati :" : "Domaines Frascati :"}</h5>
                        <ul>
                            {frascati.map((f) => (
                                f ? (
                                    <li key={f.idfrascati}>
                                        <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/frascatiDetail/${f.idfrascati}`)}>
                                            {f.idfrascati} {f.frascati}
                                        </Button>
                                    </li>
                                ) : (
                                    <li key={Math.random()}>Frascati non trouvé ou supprimé ou supprimé !</li>
                                )
                            ))}
                        </ul>
                    </>
                ) : null}

                {disciplines && disciplines.length > 0 ? (
                    <>
                        <h5>{disciplines.length === 1 ? "Discipline CRef :" : "Disciplines CRef :"}</h5>
                        <ul>
                            {disciplines.map((d) => (
                                d ? (
                                    <li key={d.idcodecref}>
                                        <Button variant="link" className="btn-custom" onClick={() => handleNavigation(`/disciplineDetail/${d.idcodecref}`)}>
                                            {d.discipline}
                                        </Button>
                                    </li>
                                ) : (
                                    <li key={Math.random()}>Discipline non trouvée ou supprimée !</li>
                                )
                            ))}
                        </ul>
                    </>
                ) : null}

                <div>
                    <PermissionGuard permission={'write:all-information'}>
                        <Button variant="primary" className="btn-custom" onClick={() => handleNavigation(`/uniteModifier/${idunite}`)}>
                            Modifier
                        </Button>

                        <div className="btn-custom">
                            <UniteSupprimer idunite={idunite} />
                        </div>
                    </PermissionGuard>

                    <Button variant="outline-info" className="btn-custom" onClick={() => handleNavigation("/uniteStat")}>
                        Statistique
                    </Button>

                    <Button variant="outline-secondary" className="btn-custom" onClick={() => handleNavigation("/unite")}>
                        Unités
                    </Button>
                </div>
            </div>
        </>
    );
}

export default UniteDetail;

