import './App.css';
import LoginButton from "./components/buttons/LoginButton.jsx";
import LogoutButton from "./components/buttons/LogoutButton.jsx";

import Header from "./components/structure/Header.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {Spinner} from "react-bootstrap";

import Layout from "./components/structure/Layout.jsx";

/*import { useTranslation } from "react-i18next";*/
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    const {isAuthenticated, isLoading} = useAuth0();
    /*const { t } = useTranslation();*/

    if (isLoading) {
        return <Spinner/>;
    }

    return (

            <Router>
                <div >
                    <Header/>
                    {isAuthenticated ? (
                        <div>

                            {/*<Profile/>*/}

                            <Layout/>


                            {/*<Lang/>
                        <p>{t('common.translated-text')}</p>*/}

                        </div>
                    ) :(
                        <div>
                            <LoginButton/>
                        </div>
                    )}
                </div>

            </Router>


    );
}

export default App;
