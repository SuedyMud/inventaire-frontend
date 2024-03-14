import {useParams} from "react-router-dom";

function FaculteDetail() {
    const { facId } = useParams();

    const links = {
        'G1': 'https://esp.ulb.be/fr/la-recherche/les-centres-de-recherche',
        'H': 'https://polytech.ulb.be/fr/recherche/sciences-de-l-ingenieur',
    };

    // Vérifiez si l'ID existe dans les liens, sinon affichez un lien par défaut
    const link = links[facId] || 'https://cvchercheurs.ulb.ac.be/Site/';

    // Renvoie le contenu correspondant au lien
    return (
        <div>
            <h2>Faculté détaillée</h2>
            <p>Contenu correspondant à l'ID : {facId}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">Lien vers les détails</a>
        </div>
    );
}

export default FaculteDetail;