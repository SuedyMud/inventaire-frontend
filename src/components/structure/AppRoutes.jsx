import React from "react";
import {Route, Routes} from "react-router-dom";
import Faculte from "../pages/Faculte.jsx";
import Unite from "../pages/Unite.jsx";
import Projet from "../pages/Projet.jsx";
import Chercheur from "../pages/Chercheur.jsx";
import Discipline from "../pages/Discipline.jsx";
import Frascati from "../pages/Frascati.jsx";


function AppRoutes() {
    return (

            <Routes>
                <Route index element={<Faculte/>}/>
                <Route path="/faculte" element={<Faculte/>}/>
                <Route path="/unite" element={<Unite/>}/>
                <Route path="/projet" element={<Projet/>}/>
                <Route path="/chercheur" element={<Chercheur/>}/>
                <Route path="/frascati" element={<Frascati/>}/>
                <Route path="/discipline" element={<Discipline/>}/>
            </Routes>
    );
}

export default AppRoutes;