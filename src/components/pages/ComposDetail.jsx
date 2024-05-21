import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import {useQuery} from "react-query";
import {getComposDetail} from "../../utils/ApiGet.js";

function ComposDetail() {
    const { getAccessTokenSilently } = useAuth0();
    const { refunite} = useParams();


    const { data : compos, isLoadingCompos   } = useQuery(["composDetail", refunite], async () => {
        return getComposDetail({ accessToken : await getAccessTokenSilently(), refunite: refunite});
    });


    if ( isLoadingCompos) {
        return <p>Loading...</p>;
    }

    if (!compos) {
        return null; // Ou vous pouvez retourner un composant de chargement ou un message d'attente
    }

    // Déstructuration des propriétés de l'objet unite

    const {responsable} = compos;


    return (
        <>

            <div>
                <p>(Code : {refunite})</p>

                <p>Responsable de l'unité : {{responsable}}</p>


            </div>
        </>
    );
}

export default ComposDetail;

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