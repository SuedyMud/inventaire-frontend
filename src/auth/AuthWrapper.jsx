import { createContext, useContext, useState } from "react"
import { RenderHeader } from "../components/structure/Header";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";
import {useAuth0} from "@auth0/auth0-react";
import {Spinner} from "react-bootstrap";


const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);


function LoginButton() {
    return null;
}

export const AuthWrapper = () => {

    const [ user, setUser ] = useState({name: "", isAuthenticated: false})




    const login = (userName, password) => {


        // Make a call to the authentication API to check the username

        return new Promise((resolve, reject) => {

            if (password === "password") {
                setUser({name: userName, isAuthenticated: true})
                resolve("success")
            } else {
                reject("Incorrect password")
            }
        })


    }
    const logout = () => {

        setUser({...user, isAuthenticated: false})
    }


    return (

        <AuthContext.Provider value={{user, login, logout}}>
            <>
                <RenderHeader />
                <RenderMenu />
                <RenderRoutes />
            </>
        </AuthContext.Provider>
    )

}



