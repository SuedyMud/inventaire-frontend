import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ListGroup, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getFrascati } from "../../utils/ApiGet.js";

function FrascatiRecherche() {
    const { getAccessTokenSilently } = useAuth0();
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useQuery("frascati", async () => {
        const accessToken = await getAccessTokenSilently();
        return getFrascati({ accessToken });
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
                    <h2>Répertoire des Unités par Frascati</h2>
                </div>

                {/* <PermissionGuard permission={'read:information'}> */}
                <div className="col-md-3 text-right">
                    <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/frascatiStat")}>
                        Statistiques
                    </Button>
                    <Button variant="success" className="btn-custom" onClick={() => handleNavigation("/frascatiAjouter")}>
                        Ajouter
                    </Button>
                </div>
                {/* </PermissionGuard> */}
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
                                key={item.idfrascati}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <Link to={{
                                        pathname: `/frascatiDetail/${item.idfrascati}`,
                                        state: {
                                            description: item.description,
                                            nom: item.nom,
                                            zufrascati: item.zufrascati
                                        }
                                    }} style={{ textDecoration: 'none' }}>
                                        <p>{item.idfrascati} {item.frascati}</p>
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

export default FrascatiRecherche;
