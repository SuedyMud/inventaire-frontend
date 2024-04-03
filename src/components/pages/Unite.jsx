import {useAuth0} from "@auth0/auth0-react";
import {useState} from "react";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import {useQuery} from "react-query";
import {getUnite} from "../../utils/api.js";

function Unite() {
    const {getAccessTokenSilently} = useAuth0();
    const [currentPage, setCurrentPage] = useState('A');

    const { data, isLoading } = useQuery(["unites", currentPage], async () => {
        const accessToken = await getAccessTokenSilently();
        return getUnite({ accessToken, letter: currentPage });
    });

   /* useEffect(() => {
        const fetchData = async (letter) => {

        }

        fetchData(currentPage);
    }, [currentPage, getAccessTokenSilently]);*/

    const handlePaginationClick = (letter) => {
        setCurrentPage(letter);
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const paginationItems = alphabet.split('').map((letter, index) => {
        // Vérifier si data est défini et non null
        const letterIsActive = data && data.some(item => item.nom.charAt(0).toUpperCase() === letter);
        return (
            <Pagination.Item
                key={index}
                active={letter === currentPage}
                disabled={!letterIsActive}
                onClick={() => handlePaginationClick(letter)}
            >
                {letter}
            </Pagination.Item>
        );
    });



    // Filtrer les données pour n'afficher que les éléments dont le nom commence par la lettre de la page actuelle
    const filteredData = data ? data.filter(item => item.nom.charAt(0).toUpperCase() === currentPage) : [];


    return (
        <>
            <h2>Répertoires par Unités</h2>
            <p>Classement par ordre alphabétique</p>
            <div>
                <div className="pagination">
                    <Pagination>{paginationItems}</Pagination>
                </div>
                <ListGroup as="ul">
                    {filteredData.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.idunite}
                            className="d-flex justify-content-between align-items-center my-1">
                            <div>
                                <Link to={{
                                    pathname: `/uniteDetail/${item.idunite}`,
                                    state : {
                                        campus: item.campus,
                                        localisation: item.localisation,
                                        rue: item.rue,
                                        numero: item.numero,
                                        codePostal: item.codePostal,
                                        localite: item.localite, // Corrected: added missing comma after item.codePostal
                                        email: item.email,
                                        site: item.site
                                    }
                                }} style={{textDecoration: 'none'}}>
                                    <p>{item.nom}</p>
                                </Link>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className="pagination">
                    <Pagination>{paginationItems}</Pagination>
                </div>
            </div>
        </>
    );
}

export default Unite;
