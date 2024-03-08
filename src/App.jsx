import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import './App.css'
import {Spinner} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Unite from './pages/Unite';
import Projet from "./pages/Projet.jsx";
import Chercheur from "./pages/Chercheur.jsx";
import Faculte from "./pages/Faculte.jsx";
import Frascati from "./pages/Frascati.jsx";
import SFI from "./pages/SFI.jsx";
import Discipline from "./pages/Discipline.jsx";
import NoPage from './pages/NoPage';
import LogoutButton from "./components/buttons/LogoutButton.jsx";
import LoginButton from "./components/buttons/LoginButton.jsx";
import Layout from "./components/Layout.jsx";


function App() {


    return (
        <>

            <Routes>
                <Route path="/" element={<Faculte/>}/>
                <Route path="/unite" element={<Unite/>}/>
                <Route path="/projet" element={<Projet/>}/>
                <Route path="/chercheur" element={<Chercheur/>}/>
                <Route path="/faculte" element={<Faculte/>}/>
                <Route path="/frascati" element={<Frascati/>}/>
                <Route path="/sfi" element={<SFI/>}/>
                <Route path="/discipline" element={<Discipline/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>

        </>
    );
}

export default App
