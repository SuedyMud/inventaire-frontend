import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Container, Spinner } from 'react-bootstrap';
import LogoutButton from "./buttons/LogoutButton.jsx";
import LoginButton from "./buttons/LoginButton.jsx";

export default function Layout({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {isAuthenticated ? (
                <>
                    <LogoutButton/>
                    <Header />
                    <Container className="w-75">{children}</Container>
                    <Footer />
                </>
            ) : (
                <div>
                    <LoginButton/>
                    <Container className="w-75">Vous devez être connecté pour accéder à cette page.</Container>


                </div>
                       )}
        </>
    );
}
