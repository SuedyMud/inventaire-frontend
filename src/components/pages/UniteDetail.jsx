import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UniteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idunite } = useParams();
    const [unite, setUnite] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zunite/${idunite}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setUnite(response.data);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [idunite, getAccessTokenSilently]);

    if (!unite) {
        return null; // Ou vous pouvez retourner un composant de chargement ou un message d'attente
    }


    // Déstructuration des propriétés de l'objet unite
    const { nom, description, localisation, rue, numero, codePostal, localite, email,telephone,fax, site1, site2 } = unite;

    return (
        <>
            <h2>{nom}</h2>
            <div>
                <p>(Code : {idunite})</p>

                <p>Responsable de l'unité : </p>
                <p>{description}</p>

                {/*<p>Campus : {localisation}</p>*/}
                <p>Localisation : {localisation}</p>
                <p>Adresse : {rue} {numero}, {codePostal} {localite}</p>
                <p>Email : <a href={`mailto:${email}`}>{email}</a></p>
                {telephone && <p>Téléphone : {telephone}</p>}
                {fax && <p>fax : {fax}</p>}
                {site1 && <p>Site Web : <a href={site1}>{site1}</a></p>}
                {site2 && <p>Autre Site : <a href={site2}>{site2}</a></p>}

                <h5>Domaines Frascati : </h5>
                <h5>Disciplines CRef : </h5>

            </div>
        </>
    );
}

export default UniteDetail;
