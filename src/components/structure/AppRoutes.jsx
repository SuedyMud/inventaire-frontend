import React from "react";
import {Route, Routes} from "react-router-dom";
import Faculte from "../pages/Faculte.jsx";
import Unite from "../pages/Unite.jsx";
import Projet from "../pages/Projet.jsx";
import Chercheur from "../pages/Chercheur.jsx";
import Discipline from "../pages/Discipline.jsx";
import Frascati from "../pages/Frascati.jsx";
import FaculteDetail from "../pages/FaculteDetail.jsx";
import UniteDetail from "../pages/UniteDetail.jsx";
import FaculteStat from "../pages/FaculteStat.jsx";
import ChercheurDetail from "../pages/ChercheurDetail.jsx";


function AppRoutes() {
    return (

            <Routes>
                <Route index element={<Faculte/>}/>
                <Route path="/faculte" element={<Faculte/>}/>
                <Route path="/faculte/:facId" component={FaculteDetail} />
                <Route path="/faculteStat" element={FaculteStat} />
                <Route path="/unite" element={<Unite/>}/>
                <Route path="/unite/:idunite" element={<UniteDetail/>} />
                <Route path="/projet" element={<Projet/>}/>
                <Route path="/chercheur" element={<Chercheur/>}/>
                <Route path="/chercheurDetail/:idche" element={<ChercheurDetail />} /> {/*// Ajoutez cette ligne pour ChercheurDetail*/}
                <Route path="/frascati" element={<Frascati/>}/>
                <Route path="/discipline" element={<Discipline/>}/>
            </Routes>
    );
}

export default AppRoutes;