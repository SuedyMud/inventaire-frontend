import React from 'react';
import Header from './structure/Header.jsx';
import Footer from './Footer.jsx';
import {Container} from "react-bootstrap";


export default function Layout({children}) {

    return (
        <>
            <Header/>
            <Container className="w-75">{children}</Container>
            <Footer/>
        </>
    );
}
