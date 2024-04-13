import './App.css';

import Header from "./components/structure/Header.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {Spinner} from "react-bootstrap";

import Layout from "./components/structure/Layout.jsx";

/*import { useTranslation } from "react-i18next";*/
import {BrowserRouter as Router} from "react-router-dom";
import Footer from "./components/structure/Footer.jsx";
import Navigation from "./components/structure/Navigation.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


function App() {
    const {isAuthenticated, isLoading} = useAuth0();
    /*const { t } = useTranslation();*/

    if (isLoading) {
        return <Spinner/>;
    }

    const queryClient = new QueryClient()

    return (

        <QueryClientProvider client={queryClient}>

            <Router>
                <div >
                    <Header/>
                    <Navigation/>
                    {isAuthenticated ? (
                        <div>
                            {/*<Profile/>*/}
                                <Layout/>

                            {/*<Lang/>
                        <p>{t('common.translated-text')}</p>*/}

                        </div>
                    ) :(
                        <div>
                            <p>vous n'êtes pas connectez!</p>
                           {/* <LoginButton/>*/}
                        </div>
                    )}

                    <Footer/>
                </div>

            </Router>
           {/* <ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>


    );
}

export default App;
