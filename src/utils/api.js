import axios from "axios";
import {useState} from "react";

export async function getFaculte({accessToken}){
    const trueAccessToken = await accessToken;

    try {
        const response = await axios.get("/api/zfac/liste", {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
        });
        if (response.status === 200) {
            const filteredData = response.data.content.filter(
                (item) => item.actif === 1 && item.invent20 === 1
            );

            return(
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
                size: 10000, // Nombre d'éléments par page
            },
        });

        if (response.status === 200) {
            const filteredData = response.data.content.filter(
                (item) => item.datefin === '0000-00-00 00:00:00' || !item.datefin
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

export async function getProjet({accessToken, letter}){
    const trueAccessToken = await accessToken;

    try {

        const response = await axios.get("api/zprojet/liste", {
            headers: {
                Authorization: `Bearer ${trueAccessToken}`,
            },
            params: {
                lettre: letter,
                page: 0, // Page numéro 0 (première page)
                size: 10000, // Nombre d'éléments par page
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