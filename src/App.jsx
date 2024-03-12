import './App.css';
import LoginButton from "./components/buttons/LoginButton.jsx";
import LogoutButton from "./components/buttons/LogoutButton.jsx";

import Header from "./components/structure/Header.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {Spinner} from "react-bootstrap";

import Layout from "./components/structure/Layout.jsx";
import Lang from "./components/langue/Lang.jsx";
import { useTranslation } from "react-i18next";

function App() {
    const {isAuthenticated, isLoading} = useAuth0();
    const { t } = useTranslation();

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
                        <Lang/>
                        <p>{t('common.translated-text')}</p>

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
