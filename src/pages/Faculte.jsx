import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

function Faculte() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zfac/liste", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    size: 10,
                },
            });

            if (response.status === 200) {
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
            } else {
                console.error("Erreur lors de la récupération des données");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données : ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, getAccessTokenSilently]);

    return (
        <>
            <Header />
            <h2>Facultés</h2>
            <div>
                <ListGroup as="ol" numbered>
                    {data.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.fac}
                            className="d-flex justify-content-between align-items-center my-1"
                        >
                            <div>
                                <p>{item.faculte}</p>
                                <p>Faculté UK: {item.faculteUK}</p>
                                <p>Sigle: {item.sigle}</p>
                                <p>Date Maj: {item.dMaj}</p>
                                <p>CC: {item.cc}</p>
                                <p>Infofin: {item.infofin}</p>
                                <p>ID Fac: {item.idFac}</p>
                                <p>Actif: {item.actif}</p>
                                <p>Groupe: {item.groupe}</p>
                                <p>Invent20: {item.invent20}</p> </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className="pagination">
                    <Button
                        variant="outline-secondary"
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
                        disabled={currentPage === 0}
                    >
                        Page précédente
                    </Button>
                    <span className="mx-3">
                        Page {currentPage + 1} sur {totalPages}
                    </span>
                    <Button
                        variant="outline-secondary"
                        onClick={() =>
                            setCurrentPage(Math.min(currentPage + 1, totalPages - 1))
                        }
                        disabled={currentPage === totalPages - 1}
                    >
                        Page suivante
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Faculte;
