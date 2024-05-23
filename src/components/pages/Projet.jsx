import {useAuth0} from "@auth0/auth0-react";
import {useState} from "react";
import {Button, ListGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import {useQuery} from "react-query";
import {getProjet} from "../../utils/ApiGet.js";


function Projet() {
    const {getAccessTokenSilently} = useAuth0();
    const [currentPage, setCurrentPage] = useState('A');
    const navigate = useNavigate();

    const {data, isLoading} = useQuery(["projet", currentPage], async () => {
        const accessToken = await getAccessTokenSilently();
        return getProjet({accessToken, letter: currentPage})
    })


    const handlePaginationClick = (letter) => {
        setCurrentPage(letter);
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const paginationItems = alphabet.split('').map((letter, index) => {
        // Vérifier s'il y a des éléments commençant par cette lettre
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
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>


            <div className="row">
                <div className="col-md-9"> {/* Colonne prenant 9/12 de la largeur */}
                    <h2>Répertoire par Projets</h2>
                    <p>Classement par ordre alphabétique</p>
                </div>

                <div className="col-md-3 text-right">
                    <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/projetStat")}>
                        Statistiques {/*Statistiques des Projets*/}
                    </Button>
                    <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/projetAjouter")}>
                        Ajouter {/*Ajouter un Projet*/}
                    </Button>
                </div>

            </div>



            <div>
                <div className="pagination">
                    <Pagination>{paginationItems}</Pagination>
                </div>

                {!isLoading && (
                    <ListGroup as="ul">
                        {filteredData.map((item) => (
                            <ListGroup.Item
                                as="li"
                                key={item.idprojet}
                                className="d-flex justify-content-between align-items-center my-1">
                                <div>
                                    <Link to={{
                                        pathname: `/projetDetail/${item.idprojet}`,
                                        state: {
                                            nom: item.nom,
                                            resume: item.resume,
                                            resumeuk: item.resumeUK,
                                        }
                                    }} style={{textDecoration: 'none'}}>
                                        <p>{item.nom}</p>
                                    </Link>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                <div className="pagination">
                    <Pagination>{paginationItems}</Pagination>
                </div>
            </div>
        </>
    );
}

export default Projet;
