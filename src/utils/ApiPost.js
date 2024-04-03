import axios from "axios";

export async function updateChercheur(){
    try {
        const response = await axios.put(`/api/zchercheur/${idche}`, chercheur, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            console.log("Chercheur modifié avec succès");
            setShowNotif(true);
            setTimeout(() => setShowNotif(false), 3000);
        } else {
            console.error("Erreur lors de la modification du chercheur");
        }
    } catch (error) {
        console.error("Erreur lors de la modification du chercheur : ", error);
    }
}