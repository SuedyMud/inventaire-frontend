import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

function SFI() {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get("api/zsfi/liste", {
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
            <h2>Départements</h2>
            <div>
                <ListGroup as="ul">
                    {data.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item.iddepart}
                            className="d-flex justify-content-between align-items-center my-1"
                        >
                            <div>
                                <h3>{item.depart}</h3>
                                {/*<p>Departement UK: {item.departUK}</p>
                                <p>Ref Faculte: {item.reffac}</p>
                                <p>Ordre: {item.ordre}</p>*/}


                            </div>
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

export default SFI;
