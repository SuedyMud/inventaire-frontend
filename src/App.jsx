
import LoginButton from "./components/buttons/LoginButton.jsx";
import LogoutButton from "./components/buttons/LogoutButton.jsx";
import Profile from "./components/pages/Profile.jsx";

function App() {
    return (
        <>
            <div>
                <p><LoginButton/> <LogoutButton/></p>
                <Profile/>
            </div>
        </>
    );
}

export default App;
