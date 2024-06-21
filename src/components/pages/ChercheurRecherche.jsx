import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { FormControl, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getChercheur } from "../../utils/ApiGet.js";

function ChercheurRecherche() {
    const { getAccessTokenSilently } = useAuth0();
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useQuery("chercheur", async () => {
        const accessToken = await getAccessTokenSilently();
        return getChercheur({ accessToken });
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
        item.nom.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.prenom.toLowerCase().includes(searchKeyword.toLowerCase())
    ) : [];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-9">
                    <h2>Répertoire par Chercheurs</h2>
                    <p>Rechercher par nom ou prénom</p>
                </div>
                <div className="col-md-3 text-right">
                    <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/chercheurStat")}>
                        Statistiques
                    </Button>
                    <Button variant="success" className="btn-custom" onClick={() => handleNavigation("/chercheurAjouter")}>
                        Ajouter
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <FormControl
                        type="text"
                        placeholder="Rechercher par nom ou prénom"
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
                                key={item.idchercheur}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <Link to={{
                                        pathname: `/chercheurDetail/${item.idchercheur}`,
                                        state: {
                                            nom: item.nom,
                                            prenom: item.prenom,
                                            laboratoire: item.laboratoire,
                                            email: item.email,
                                            telephone: item.telephone,
                                        }
                                    }} style={{ textDecoration: 'none' }}>
                                        <p>{item.nom} {item.prenom}</p>
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

export default ChercheurRecherche;
