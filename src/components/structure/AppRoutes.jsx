import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../pages/Home.jsx";
import {About} from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Faculte from "../pages/Faculte.jsx";
import Unite from "../pages/Unite.jsx";
import Projet from "../pages/Projet.jsx";
import Chercheur from "../pages/Chercheur.jsx";
import Discipline from "../pages/Discipline.jsx";



function AppRoutes() {
    return (

            <Routes>
                <Route index element={<Faculte/>}/>
                <Route path="/faculte" element={<Faculte/>}/>
                <Route path="/unite" element={<Unite/>}/>
                <Route path="/projet" element={<Projet/>}/>
                <Route path="/chercheur" element={<Chercheur/>}/>
                <Route path="/discipline" element={<Discipline/>}/>

            </Routes>


    );
}

export default AppRoutes;