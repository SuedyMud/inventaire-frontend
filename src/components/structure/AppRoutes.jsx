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
import ChercheurModifier from "../pages/ChercheurModifier.jsx";
import ChercheurDelete from "../pages/ChercheurDelete.jsx";
import ProjetDetail from "../pages/ProjetDetail.jsx";
import FrascatiDetail from "../pages/FrascatiDetail.jsx";
import ProjetStat from "../pages/ProjetStat.jsx";
import UniteStat from "../pages/UniteStat.jsx";
import ChercheurStat from "../pages/ChercheurStat.jsx";
import Compos from "../pages/Compos.jsx";
import ComposDetail from "../pages/ComposDetail.jsx";
import ChercheurAjouter from "../pages/ChercheurAjouter.jsx";
import UniteAjouter from "../pages/UniteAjouter.jsx";
import ProjetAjouter from "../pages/ProjetAjouter.jsx";


function AppRoutes() {
    return (

            <Routes>
                <Route index element={<Faculte/>}/>
                <Route path="/faculte" element={<Faculte/>}/>
                <Route path="/faculte/:facId" component={FaculteDetail} />
                <Route path="/faculteStat" element={<FaculteStat />} />
                <Route path="/unite" element={<Unite/>}/>
                <Route path="/unteAjouter" element={<UniteAjouter />} />
                <Route path="/uniteDetail/:idunite" element={<UniteDetail/>} />
                <Route path="/uniteStat" element={<UniteStat/>} />
                <Route path="/compos" element={<Compos/>} />
                <Route path="/composDetail/:refunite" element={<ComposDetail/>} />
                <Route path="/projet" element={<Projet/>}/>
                <Route path="/projetAjouter" element={<ProjetAjouter />} />
                <Route path="/projetDetail/:idprojet" element={<ProjetDetail/>}/>
                <Route path="/projetStat" element={<ProjetStat/>}/>
                <Route path="/chercheur" element={<Chercheur/>}/>
                <Route path="/chercheurAjouter" element={<ChercheurAjouter />} />
                <Route path="/chercheurDetail/:idche" element={<ChercheurDetail />} />
                <Route path="/chercheurModifier/:idche" element={<ChercheurModifier />} />
                <Route path="/chercheurDelete/:idche" element={<ChercheurDelete />} />
                <Route path="/chercheurStat" element={<ChercheurStat />} />
                <Route path="/frascati" element={<Frascati/>}/>
                <Route path="/frascatiDetail/:idfrascati" element={<FrascatiDetail/>}/>
                <Route path="/discipline" element={<Discipline/>}/>
            </Routes>
    );
}

export default AppRoutes;