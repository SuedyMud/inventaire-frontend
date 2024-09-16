import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ListGroup, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getFaculte } from "../../utils/ApiGet.js";

function FaculteRecherche() {
    const { getAccessTokenSilently } = useAuth0();
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useQuery("faculte", async () => {
        const accessToken = await getAccessTokenSilently();
        return getFaculte({ accessToken });
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
        item.faculte.toLowerCase().includes(searchKeyword.toLowerCase())
    ) : [];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-9">
                    <h2>Répertoire des Unités par Faculté</h2>
                    <p>Classement par Facultés</p>
                </div>

                <div className="col-md-3 text-right">
                    <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/faculteStat")}>
                        Statistiques
                    </Button>
                    <Button variant="success" className="btn-custom" onClick={() => handleNavigation("/faculteAjouter")}>
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
                                key={item.fac}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <Link to={{
                                        pathname: `/faculteDetail/${item.fac}`,
                                        state: {
                                            faculte: item.faculte,
                                            faculteUk: item.faculteUk,

                                        }
                                    }} style={{ textDecoration: 'none' }}>
                                        <p>{item.faculte}</p>
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

export default FaculteRecherche;
