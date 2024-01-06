import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NoPage from './pages/Nopage';
import Unite from './pages/Unite';
import LoginButton from "./components/LoginButton.jsx";
import LogoutButton from "./components/LogoutButton.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {Spinner} from "react-bootstrap";
import Projet from "./pages/Projet.jsx";
import ProjetDetail from "./pages/ProjetDetail.jsx";


function App() {
  const [count, setCount] = useState(0)
    const {user:user, isAuthenticated , isLoading} = useAuth0();

  if(isLoading){
      return <Spinner/>;
  }

  return (
    <>


        <h1>Inventaire de la recherche</h1>

          {isAuthenticated ?
              <>
            <LogoutButton/>

              <BrowserRouter>
                <Routes>
                  <Route index element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/contact" element={<Contact/>}/>
                  <Route path="/unite" element={<Unite/>}/>
                  <Route path="/projet" element={<Projet/>}/>
                  <Route path="/projet/:id" element={<ProjetDetail/>}/>
                  <Route path="*" element={<NoPage/>}/>

                </Routes>

              </BrowserRouter>
        </>
        : <LoginButton/>}

    </>
  );
}

export default App
