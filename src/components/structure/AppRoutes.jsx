import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../pages/Home.jsx";
import {About} from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Faculte from "../pages/Faculte.jsx";
import Unite from "../pages/Unite.jsx";
import Projet from "../pages/Projet.jsx";



function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                 <Route index element={<Faculte/>}/>
            <Route path="/faculte" element={<Faculte/>}/>
            <Route path="/unite" element={<Unite/>}/>
            <Route path="/projet" element={<Projet/>}/>

            </Routes>
        </BrowserRouter>

    );
}

export default AppRoutes;