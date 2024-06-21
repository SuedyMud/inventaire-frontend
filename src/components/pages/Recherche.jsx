import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { FormControl, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
    getFaculte,
    getUnite,
    getProjet,
    getChercheur,
    getFrascati,
    getDiscipline
} from "../../utils/ApiGet.js";

function Recherche() {
    const { getAccessTokenSilently } = useAuth0();
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useQuery("allData", async () => {
        const accessToken = await getAccessTokenSilently();
        const [facultes, unites, projets, chercheurs, frascatis, disciplines] = await Promise.all([
            getFaculte({ accessToken }),
            getUnite({ accessToken }),
            getProjet({ accessToken }),
            getChercheur({ accessToken }),
            getFrascati({ accessToken }),
            getDiscipline({ accessToken })
        ]);
        return [...facultes, ...unites, ...projets, ...chercheurs, ...frascatis, ...disciplines];
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
        Object.values(item).some(value =>
            typeof value === "string" && value.toLowerCase().includes(searchKeyword.toLowerCase())
        )
    ) : [];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-9">
                    <h2>Répertoires par Unités</h2>
                    <p>Rechercher par nom ou autre critère</p>
                </div>
                <div className="col-md-3 text-right">
                    <Button variant="info" className="btn-custom" onClick={() => handleNavigation("/uniteStat")}>
                        Statistiques
                    </Button>
                    <Button variant="success" className="btn-custom" onClick={() => handleNavigation("/uniteAjouter")}>
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
                        {filteredData.map((item, index) => (
                            <ListGroup.Item
                                as="li"
                                key={index}
                                className="d-flex justify-content-between align-items-center my-1"
                            >
                                <div>
                                    <Link to={{
                                        pathname: `/detail/${item.id}`,  // Assuming each item has a unique ID
                                        state: { ...item }
                                    }} style={{ textDecoration: 'none' }}>
                                        <p>{item.nom || item.faculte || item.projet || item.chercheur || item.frascati || item.discipline}</p>
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

export default Recherche;
