import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

function SignInButton() {
    const {loginWithRedirect} = useAuth0();

    return (
        <>
            <Button variant="primary" onClick={() => loginWithRedirect()} >
                Sign In
            </Button>{''}
        </>

    );
}

export default SignInButton;
