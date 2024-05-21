import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import {useQuery} from "react-query";
import {getChercheurDetail, getUniteDetail} from "../../utils/ApiGet.js";
import ComposDetail from "./ComposDetail.jsx";

function UniteDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { idunite} = useParams();
    //const refunite = idunite; // Attribution de la valeur de idunite à refunite


    const { data : unite, isLoadingUnite  } = useQuery(["uniteDetail", idunite], async () => {
        return getUniteDetail({ accessToken : await getAccessTokenSilently(), idunite: idunite});
    });

   /* const { data : compos, isLoadingCompos   } = useQuery(["composDetail", refunite], async () => {
        return getComposDetail({ accessToken : await getAccessTokenSilently(), refunite: refunite});
    });*/


    if (isLoadingUnite /*|| isLoadingCompos*/) {
        return <p>Loading...</p>;
    }

    if (!unite) {
        return null; // Ou vous pouvez retourner un composant de chargement ou un message d'attente
    }

    /*if (!compos) {
        return null; // Ou vous pouvez retourner un composant de chargement ou un message d'attente
    }*/

    // Déstructuration des propriétés de l'objet unite
    const { nom, description, localisation, rue, numero, codePostal, localite, email, telephone, fax, site1, site2, composList } = unite;
    /*const {responsable} = compos;*/


    return (
        <>
            <h2>{nom}</h2>
            <div>
                <p>(Code : {idunite})</p>

                <p>Responsable de l'unité : {/*{{responsable}}*/}</p>
                {/* Afficher les détails des chercheurs */}
                {composList && composList.map(async (composId) => {
                    const chercheur = await getChercheurDetail({ accessToken: await getAccessTokenSilently(), idche: composId });
                    return (
                        <div key={chercheur.id}>
                            <h3>{chercheur.nom} {chercheur.prenom}</h3>
                            <p>Autres détails du chercheur...</p>
                        </div>
                    );
                })}

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

/*const { refunite } = useParams();
    const [compos, setCompos] = useState(null);*/

/*useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`/api/zcompos/${refunite}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        page: 0, // Page numéro 0 (première page)
                        size: 10000, // Nombre d'éléments par page
                    },
                });

                if (response.status === 200) {
                    setCompos(response.data);
                } else {
                    console.error("Erreur lors de la récupération des données");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchData();
    }, [refunite, getAccessTokenSilently]);

    if (!compos) {
        return null; // Ou vous pouvez retourner un composant de chargement ou un message d'attente
    }*/

// Déstructuration des propriétés de l'objet unite
/*const { responsable } = compos;*/