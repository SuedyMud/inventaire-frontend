import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route} from 'react-router-dom';

import NoPage from './pages/Nopage';
import Unite from './pages/Unite';

import {useAuth0} from "@auth0/auth0-react";
import {Spinner} from "react-bootstrap";
import Projet from "./pages/Projet.jsx";
import ProjetDetail from "./pages/ProjetDetail.jsx";
import Chercheur from "./pages/Chercheur.jsx";
import Faculte from "./pages/Faculte.jsx";
import Frascati from "./pages/Frascati.jsx";
import SFI from "./pages/SFI.jsx";
import Discipline from "./pages/Discipline.jsx";
import LogoutButton from "./components/LogoutButton.jsx";
import LoginButton from "./components/LoginButton.jsx";


function App() {
  const [count, setCount] = useState(0)
    const {user:user, isAuthenticated , isLoading} = useAuth0();

  if(isLoading){
      return <Spinner/>;
  }

  return (
    <>

      {isAuthenticated ?
          <>

              {/*<LogoutButton/>*/}

              <BrowserRouter>
                <Routes>
                  <Route index element={<Faculte/>}/>
                  <Route path="/faculte" element={<Faculte/>}/>
                  <Route path="/unite" element={<Unite/>}/>
                  <Route path="/projet" element={<Projet/>}/>
                  <Route path="/projet/:id" element={<ProjetDetail/>}/>
                  <Route path="/chercheur" element={<Chercheur/>}/>
                  <Route path="/frascati" element={<Frascati/>}/>
                  <Route path="/sfi" element={<SFI/>}/>
                  <Route path="/discipline" element={<Discipline/>}/>
                  <Route path="*" element={<NoPage/>}/>

                </Routes>

              </BrowserRouter>

          </>
          :
          <LoginButton/>}

    </>
  );
}

export default App
