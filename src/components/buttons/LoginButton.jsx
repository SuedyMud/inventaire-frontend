import {useAuth0} from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();

    return (
        <div className="button">
            <Button variant="outline-success" onClick={() => loginWithRedirect()}>
                Log In
            </Button>
        </div>

    );
};

export default LoginButton;