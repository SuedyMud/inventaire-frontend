import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { FormControl, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getUnite } from "../../utils/ApiGet.js";

function UniteRecherche() {
    const { getAccessTokenSilently } = useAuth0();
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useQuery("unite", async () => {
        const accessToken = await getAccessTokenSilently();
        return getUnite({ accessToken });
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
            </div>
        </>
    );
}

export default UniteRecherche;
