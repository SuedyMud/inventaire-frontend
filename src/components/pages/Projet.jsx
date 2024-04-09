import {useAuth0} from "@auth0/auth0-react";
import React, {useState} from "react";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import {useQuery} from "react-query";
import {getProjet} from "../../utils/ApiGet.js";


function Projet() {
    const {getAccessTokenSilently} = useAuth0();
    const [currentPage, setCurrentPage] = useState('A');

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

    return (
        <>


            <div className="row">
                <div className="col-md-9"> {/* Colonne prenant 9/12 de la largeur */}
                    <h2>Répertoire par Projets</h2>
                    <p>Classement par ordre alphabétique</p>
                </div>
                <div className="col-md-3 text-right"> {/* Colonne prenant 3/12 de la largeur et alignée à droite */}
                    <Link to="/projetStat" className="btn btn-info">
                        <span className="glyphicon glyphicon"></span> Statistiques des Projets
                    </Link>
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
                                            resumeuk: item.resumeuk,
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
