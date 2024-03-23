import { useEffect, useState } from "react";
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";

function ChercheurDetail() {
    const {state}=useLocation();

    const { idche } = useParams();
    const [chercheur, setChercheur] = useState(null);

    // Si state est null, assigne un objet vide par défaut pour éviter les erreurs de déstructuration
    const { nom, prenom } = state || {};


    useEffect(() => {
        const fetchChercheur = async () => {
            try {
                const response = await axios.get(`api/zchercheur/${idche}`);
                if (response.status === 200) {
                    setChercheur(response.data);
                } else {
                    console.error("Erreur lors de la récupération du chercheur");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du chercheur : ", error);
            }
        };
        fetchChercheur();
    }, [idche]);

    if (!chercheur) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h2>Chercheur:</h2>


            <p>Autres détails du chercheur...</p>

            <p>{nom} {prenom}</p>
        </div>
    );
}

export default ChercheurDetail;
