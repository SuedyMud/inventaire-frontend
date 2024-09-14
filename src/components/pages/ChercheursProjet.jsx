import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { getResponsablesByProjet, getChercheursByProjet } from "../../utils/ApiGet.js";

const ChercheursProjet = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { idunite, idprojet } = useParams();
    const [responsables, setResponsables] = useState([]);
    const [chercheurs, setChercheurs] = useState([]);

    useEffect(() => {
        const fetchResponsables = async () => {
            const accessToken = await getAccessTokenSilently();
            const data = await getResponsablesByProjet({ accessToken, idunite, idprojet });
            setResponsables(data);
        };

        const fetchChercheurs = async () => {
            const accessToken = await getAccessTokenSilently();
            const data = await getChercheursByProjet({ accessToken, idunite, idprojet });
            setChercheurs(data);
        };

        fetchResponsables();
        fetchChercheurs();
    }, [getAccessTokenSilently, idunite, idprojet]);

    return (
        <div>
            <h2>Responsables du Projet</h2>
            <ul>
                {responsables.map((responsable) => (
                    <li key={responsable.idche}>{responsable.nom} {responsable.prenom}</li>
                ))}
            </ul>

            <h2>Chercheurs du Projet</h2>
            <ul>
                {chercheurs.map((chercheur) => (
                    <li key={chercheur.idche}>{chercheur.nom} {chercheur.prenom}</li>
                ))}
            </ul>
        </div>
    );
};

export default ChercheursProjet;
