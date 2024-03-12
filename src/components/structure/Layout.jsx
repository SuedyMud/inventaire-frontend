import React from 'react';
import Footer from './Footer.jsx';
import {Container} from "react-bootstrap";
import Navigation from "./Navigation.jsx";
import AppRoutes from "./AppRoutes.jsx";


export default function Layout({children}) {

    return (
        <>
            <Navigation/>
            <AppRoutes/>
            <Container className="w-75">{children}</Container>
            <Footer/>
        </>
    );
}
