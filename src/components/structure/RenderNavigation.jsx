import { Route, Routes } from "react-router-dom";
import { Home, About, Contact, Faculte, Unite, Projet } from "../pages";

function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route index element={<Faculte />} />
            <Route path="/faculte" element={<Faculte />} />
            <Route path="/unite" element={<Unite />} />
            <Route path="/projet" element={<Projet />} />
        </Routes>
    );
}

export default AppRoutes;
