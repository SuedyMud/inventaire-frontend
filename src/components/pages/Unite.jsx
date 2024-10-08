import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import { useQuery } from "react-query";
import { getUnite } from "../../utils/ApiGet.js";
import PermissionGuard from "../../utils/PermissionGuard.jsx";

function Unite() {
    const { getAccessTokenSilently } = useAuth0();
    const [currentPage, setCurrentPage] = useState('A');
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(["unite", currentPage], async () => {
        return getUnite({ accessToken: await getAccessTokenSilently(), letter: currentPage });
    });

    const handlePaginationClick = (letter) => {
        setCurrentPage(letter);
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const paginationItems = alphabet.split('').map((letter, index) => {
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

    const filteredData = data ? data.filter(item => item.nom.charAt(0).toUpperCase() === currentPage) : [];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    <h2>Répertoires par Unités</h2>
                    <p>Classement par ordre alphabétique</p>
                </div>

                    <div className="col-md-4 text-right">
                        <Button variant="outline-primary" className="btn-custom" onClick={() => handleNavigation("/uniteRecherche")}>
                            Recherche
                        </Button>
                        <PermissionGuard permission={'write:all-information'}>
                        <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/uniteStat")}>
                            Statistiques
                        </Button>
                        <Button variant="success" className="btn-custom" onClick={() => handleNavigation("/uniteAjouter")}>
                            Ajouter
                        </Button>
                        </PermissionGuard>
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
                                key={item.idunite}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <Link to={{
                                        pathname: `/uniteDetail/${item.idunite}`,
                                        state: {
                                            nom: item.nom,
                                            description: item.description,
                                            campus: item.campus,
                                            localisation: item.localisation,
                                            rue: item.rue,
                                            numero: item.numero,
                                            codePostal: item.codePostal,
                                            localite: item.localite,
                                            email: item.email,
                                            telephone: item.telephone,
                                            fax: item.fax,
                                            site1: item.site1,
                                            site2: item.site2,
                                        }
                                    }} style={{ textDecoration: 'none' }}>
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

export default Unite;
