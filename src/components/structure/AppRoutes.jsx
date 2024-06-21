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
import ChercheurSupprimer from "../pages/ChercheurSupprimer.jsx";
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
import UniteModifier from "../pages/UniteModifier.jsx";
import UniteSupprimer from "../pages/UniteSupprimer.jsx";
import ProjetModifier from "../pages/ProjetModifier.jsx";
import ProjetSupprimer from "../pages/ProjetSupprimer.jsx";
import DisciplineDetail from "../pages/DisciplineDetail.jsx";
import FrascatiStat from "../pages/FrascatiStat.jsx";
import FrascatiAjouter from "../pages/FrascatiAjouter.jsx";
import FrascatiSupprimer from "../pages/FrascatiSupprimer.jsx";
import FrascatiModifier from "../pages/FrascatiModifier.jsx";
import DisciplineAjouter from "../pages/DisciplineAjouter.jsx";
import DisciplineStat from "../pages/DisciplineStat.jsx";
import FaculteAjouter from "../pages/FaculteAjouter.jsx";
import Recherche from "../pages/Recherche.jsx";
import UniteRecherche from "../pages/UniteRecherche.jsx";
import ProjetRecherche from "../pages/ProjetRecherche.jsx";
import ChercheurRecherche from "../pages/ChercheurRecherche.jsx";


function AppRoutes() {
    return (

            <Routes>
                <Route index element={<Faculte/>}/>
                <Route path="/faculte" element={<Faculte/>}/>
                <Route path="/faculteStat" element={<FaculteStat />} />
                <Route path="/faculteAjouter" element={<FaculteAjouter />} />
                <Route path="/faculte/:facId" component={FaculteDetail} />


                <Route path="/unite" element={<Unite/>}/>
                <Route path="/uniteStat" element={<UniteStat/>} />
                <Route path="/uniteAjouter" element={<UniteAjouter />} />
                <Route path="/uniteDetail/:idunite" element={<UniteDetail/>} />
                <Route path="/uniteModifier/:idunite" element={<UniteModifier/>} />
                <Route path="/uniteSupprimer/:idunite" element={<UniteSupprimer/>} />
                <Route path="/uniteRecherche" element={<UniteRecherche/>} />


                <Route path="/compos" element={<Compos/>} />
                <Route path="/composDetail/:refunite" element={<ComposDetail/>} />

                <Route path="/projet" element={<Projet/>}/>
                <Route path="/projetStat" element={<ProjetStat/>}/>
                <Route path="/projetAjouter" element={<ProjetAjouter/>} />
                <Route path="/projetDetail/:idprojet" element={<ProjetDetail/>}/>
                <Route path="/projetModifier/:idprojet" element={<ProjetModifier/>} />
                <Route path="/projetSupprimer/:idprojet" element={<ProjetSupprimer/>} />
                <Route path="/projetRecherche" element={<ProjetRecherche/>} />

                <Route path="/chercheur" element={<Chercheur/>}/>
                <Route path="/chercheurStat" element={<ChercheurStat />} />
                <Route path="/chercheurAjouter" element={<ChercheurAjouter />} />
                <Route path="/chercheurDetail/:idche" element={<ChercheurDetail />} />
                <Route path="/chercheurModifier/:idche" element={<ChercheurModifier />} />
                <Route path="/chercheurSupprimer/:idche" element={<ChercheurSupprimer />} />
                <Route path="/chercheurRecherche" element={<ChercheurRecherche/>} />


                <Route path="/frascati" element={<Frascati/>}/>
                <Route path="/frascatiDetail/:idfrascati" element={<FrascatiDetail/>}/>
                <Route path="/frascatiStat" element={<FrascatiStat />}/>
                <Route path="/frascatiAjouter" element={<FrascatiAjouter />}/>
                <Route path="/frascatiSupprimer" element={<FrascatiSupprimer />}/>
                <Route path="/frascatiModifier/:idfrascati" element={<FrascatiModifier />}/>


                <Route path="/discipline" element={<Discipline/>}/>
                <Route path="/disciplineDetail/:idcodecref" element={<DisciplineDetail />} />
                <Route path="/disciplineAjouter" element={<DisciplineAjouter />} />
                <Route path="/disciplineStat" element={<DisciplineStat />} />
                <Route path="/disciplineDetail/:idcodecref" element={<DisciplineDetail />} />

                <Route path="/recherche" element={<Recherche/>} />


            </Routes>
    );
}

export default AppRoutes;