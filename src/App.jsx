import './App.css';
import LoginButton from "./components/buttons/LoginButton.jsx";
import LogoutButton from "./components/buttons/LogoutButton.jsx";

import Header from "./components/structure/Header.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {Spinner} from "react-bootstrap";
import Profile from "./components/pages/Profile.jsx";
import AppRoutes from "./components/structure/AppRoutes.jsx";
import {Router} from "react-router-dom";
import Layout from "./components/structure/Layout.jsx";

function App() {
    const {isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <div >
            <Header/>
            {isAuthenticated ? (
                    <div>
                        <LogoutButton/>
                        {/*<Profile/>*/}
                        <Layout/>


                    </div>

                ) :(
                <div>
                    <LoginButton/>

                </div>

                )}
        </div>
    );
}

export default App;
