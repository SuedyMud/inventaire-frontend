import { Container} from "react-bootstrap";
import AppRoutes from "./AppRoutes.jsx";

export default function Layout({ children }) {
    return (
        <>
            <Container className="w-75">
                <AppRoutes/>
                {children}
            </Container>

        </>
    );
}

