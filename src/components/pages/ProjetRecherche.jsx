import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { FormControl, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getProjet } from "../../utils/ApiGet.js";

function ProjetRecherche() {
    const { getAccessTokenSilently } = useAuth0();
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useQuery("projet", async () => {
        const accessToken = await getAccessTokenSilently();
        return getProjet({ accessToken });
    }, {
        enabled: false // Disable automatic refetch on mount
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const filteredData = data ? data.filter(item =>
        item.nom.toLowerCase().includes(searchKeyword.toLowerCase())
    ) : [];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-9">
                    <h2>Répertoire par Projets</h2>
                    <p>Classement par ordre alphabétique et recherche par mot-clé</p>
                </div>
                <div className="col-md-3 text-right">
                    <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/projetStat")}>
                        Statistiques
                    </Button>
                    <Button variant="success" className="btn-custom" onClick={() => handleNavigation("/projetAjouter")}>
                        Ajouter
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <FormControl
                        type="text"
                        placeholder="Rechercher par mot-clé"
                        className="mb-3"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div>
                {!isLoading && (
                    <ListGroup as="ul">
                        {filteredData.map((item) => (
                            <ListGroup.Item
                                as="li"
                                key={item.idprojet}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <Link to={{
                                        pathname: `/projetDetail/${item.idprojet}`,
                                        state: {
                                            nom: item.nom,
                                            resume: item.resume,
                                            resumeUK: item.resumeUK,
                                        }
                                    }} style={{ textDecoration: 'none' }}>
                                        <p>{item.nom}</p>
                                    </Link>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
        </>
    );
}

export default ProjetRecherche;
