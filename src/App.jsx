import './App.css';

import Header from "./components/structure/Header.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";
import Layout from "./components/structure/Layout.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/structure/Footer.jsx";
import Navigation from "./components/structure/Navigation.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "./components/pages/Home.jsx";
import PermissionGuard from "./utils/PermissionGuard.jsx";

function App() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log('isLoading:', isLoading);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);


    if (isLoading) {
        return <Spinner />;
    }

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div>
                    <Header />
                    <Navigation />

                    {isAuthenticated ? (
                        <div>
                              <PermissionGuard permission={'read:information'}>

                            {/*<p>Bonjour {user.name}</p>*/}
                            <Layout />
                              </PermissionGuard>

                        </div>
                    ) : (
                        <>
                            <Home />
                        </>
                    )}

                    <Footer />
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
