import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import {getCompos} from "../../utils/ApiGet.js";

function Compos() {
    const { getAccessTokenSilently } = useAuth0();

    const { data, isLoading } = useQuery(["compos"], async () => {
        return getCompos({ accessToken: await getAccessTokenSilently() });
    });

    return (
        <>
            <div>
                {!isLoading &&
                    data.map((item) => (
                        <Link
                            key={item.refunite}
                            to={{
                                pathname: `/composDetail/${item.refunite}`,
                                state: {
                                    refunite: item.refunite,
                                    refche: item.refche,
                                    responsable: item.responsable,
                                },
                            }}
                            style={{ textDecoration: "none" }}
                        >
                            <p>{item.refunite}</p>
                        </Link>
                    ))}
            </div>
        </>
    );
}

export default Compos;