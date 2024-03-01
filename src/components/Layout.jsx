import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {Container} from "react-bootstrap";

// eslint-disable-next-line react/prop-types
export default function Layout({children}){
    return(
        <>
            <Header/>
            <Container className="w-75">
            {children}
            </Container>
            <Footer/>
        </>
    )
}