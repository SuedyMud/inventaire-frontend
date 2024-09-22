import axios from "axios";

export async function getFaculte({ accessToken }) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get("/api/zfac/liste", {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
            params: {
                size: 10000,
            }

        });
        if (response.status === 200) {
            const filteredData = response.data.content.filter(
                (item) => item.actif === 1 && item.invent20 === 1
            );

            return (
                filteredData.sort((a, b) => a.faculte.localeCompare(b.faculte))
            );
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}


export async function getUnite({accessToken, letter}){
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get("/api/zunite/liste", {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
            params: {
                lettre: letter,
                page: 0, // Page numéro 0 (première page)
                size: 1000, // Nombre d'éléments par page
            },
        });

        if (response.status === 200) {
            const filteredData = response.data.content
           /* const filteredData = response.data.content.filter(
                (item) => item.datefin === '0000-00-00 00:00:00' || !item.datefin
            );*/

            return(
                filteredData.sort((a, b) => a.nom.localeCompare(b.nom))
            );
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}


export async function getFacDetail({ accessToken, fac }) {
    try {
        // Récupérer le token
        const trueAccessToken = await accessToken;

        // Effectuer la requête vers l'API avec le token et l'ID de la faculté requis
        const response = await axios.get(`/api/zfac/${fac}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        // Vérifier si la requête est réussie (code 200)
        if (response.status === 200) {
            return response.data; // Retourner les données de la faculté
        } else {
            console.error("Erreur lors de la récupération des données de la faculté");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données de la faculté : ", error);
    }
}


export async function getUniteDetail({accessToken,idunite }){
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zunite/${idunite}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return (response.data);
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}

export async function getProjet({accessToken, letter}){
    const trueAccessToken = await accessToken;
    try {

        const response = await axios.get("/api/zprojet/liste", {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
            params: {
                lettre: letter,
                page: 0, // Page numéro 0 (première page)
                size: 1000, // Nombre d'éléments par page
            },
        });

        if (response.status === 200) {

            const filteredData = response.data.content.filter(
                (item) => item.datafin ===  '0000-00-00 00:00:00' || !item.datefin &&
                    !['a', 'aaa', 'aaaa', 'blabl', 'dutt'].includes(item.nom) &&
                    !item.nom.startsWith('test') &&
                    !item.nom.startsWith('Projet test')
            );

            return(
                filteredData.sort((a, b) => a.nom.localeCompare(b.nom))
            );

        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}

export async function getProjetDetail({accessToken, idprojet}){
    const trueAccessToken = await accessToken;
    try {

        const response = await axios.get(`/api/zprojet/${idprojet}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return(response.data);
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}

export async function getChercheur({accessToken, letter}) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get("/api/zchercheur/liste", {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
            params: {
                lettre: letter,
                page: 0, // Page numéro 0 (première page)
                size: 1000, // Nombre d'éléments par page
            },
        });

        if (response.status === 200) {
            const sortedData = response.data.content.sort((a, b) => a.nom.localeCompare(b.nom));
            return (sortedData);

        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}





export async function getChercheurDetail({accessToken, idche}) {
    const trueAccessToken = await accessToken;

    try {

        const response = await axios.get(`/api/zchercheur/${idche}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return(response.data);
        } else {
            console.error("Erreur lors de la récupération du chercheur");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du chercheur : ", error);
    }
}

export async function getFrascati({accessToken}) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get("/api/zfrascati/liste", {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
            params: {

                page: 0, // Page numéro 0 (première page)
                size: 1000, // Nombre d'éléments par page
            },
        });


        if (response.status === 200) {
            return(response.data.content);
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}

export async function getFrascatiDetail({accessToken,idfrascati }){
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zfrascati/${idfrascati}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return (response.data);
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}

export async function getDiscipline({accessToken}) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get("/api/zdiscipcref/liste", {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
            params: {

                page: 0, // Page numéro 0 (première page)
                size: 10000, // Nombre d'éléments par page
            },
        });

        if (response.status === 200) {
            return(response.data.content);
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}
export async function getDiscplineDetail({accessToken,idcodecref }){
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zdiscipcref/${idcodecref}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return (response.data);
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}


export async function getCompos({accessToken}) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get("/api/zucompos/liste", {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
            params: {

                page: 0, // Page numéro 0 (première page)
                size: 10000, // Nombre d'éléments par page
            },
        });

        if (response.status === 200) {
            return(response.data.content);
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}

export async function getComposDetail({accessToken,refunite}){
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zucompos/${refunite}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return(response.data);

        } else {
            console.error("Erreur lors de la récupération du compos");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du compos : ", error);
    }
}



export async function getFrascatiByUnite({ accessToken, idunite }) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zufrascati/${idunite}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Retourne les domaines Frascati associés à l'unité
        } else {
            console.error("Erreur lors de la récupération des domaines Frascati");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des domaines Frascati : ", error);
    }
}

export async function getDisciplinesByUnite({ accessToken, idunite }) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zudiscipcref/${idunite}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Retourne les disciplines CRef associées à l'unité
        } else {
            console.error("Erreur lors de la récupération des disciplines CRef");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des disciplines CRef : ", error);
    }
}

export async function getFaculteByUnite({ accessToken, idunite }) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zufac/${idunite}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Retourne les disciplines CRef associées à l'unité
        } else {
            console.error("Erreur lors de la récupération des facultés");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des facultés : ", error);
    }
}

export const getUnitesByProjet = async ({ accessToken, idprojet }) => {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zuprojet/${idprojet}/unites`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Retourne les entités ZUnite directement
        } else {
            console.error("Erreur lors de la récupération des unités");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des unités : ", error);
    }
};

// Récupérer les responsables d'un projet pour une unité spécifique
export const getResponsablesByProjet = async ({ accessToken, idunite, idprojet }) => {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zucompos/${idunite}/projet/${idprojet}/responsables`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Retourne les responsables (chercheurs)
        } else {
            console.error("Erreur lors de la récupération des responsables");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des responsables : ", error);
    }
};


export const getResponsablesUnite = async ({ accessToken, idunite }) => {

    try {
        const response = await axios.get(`/api/zcompos/${idunite}/responsables`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (response.status === 200) {
            return (response.data);
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
};

export async function getMembresByUnite({ accessToken, idunite }) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zcompos/${idunite}/membres`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Erreur lors de la récupération des membres");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des membres : ", error);
    }
}



// Récupérer les chercheurs d'un projet pour une unité spécifique
export const getChercheursByProjet = async ({ accessToken, idunite, idprojet }) => {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zucompos/${idunite}/projet/${idprojet}/chercheurs`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Retourne les chercheurs
        } else {
            console.error("Erreur lors de la récupération des chercheurs");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des chercheurs : ", error);
    }
};

export async function getProjetsByUnite({ accessToken, idunite }) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zuprojet/${idunite}/projets`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Retourne les projets associés à l'unité
        } else {
            console.error("Erreur lors de la récupération des projets");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des projets : ", error);
    }
}


/*
export async function getChercheursByUnite({ accessToken, uniteId }) {
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get(`/api/zchercheurs/zunite/${uniteId}`, {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
}
*/

