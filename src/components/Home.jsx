/*
import React from "react";
import Header from "./Header.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {Spinner} from "react-bootstrap";
import LoginButton from "./buttons/LoginButton.jsx";
import App from "../App.jsx";
import LogoutButton from "./buttons/LogoutButton.jsx";
import Layout from "./Layout.jsx";


export function Home() {

    const {isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <Spinner/>;
    }

    return (

            isAuthenticated ? (
                <div>
                    <LogoutButton/>
                    <Header/>
                    <App/>
                    <Layout/>
                </div>
            ) : (
                <LoginButton/>
            )


    );

}

export default Home;*/
