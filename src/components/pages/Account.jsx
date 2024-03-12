import { AuthData } from "../../auth/AuthWrapper.jsx"

export const Account = () => {

    const { user } = AuthData();

    return (
        <div className="page">
            <h2>Your Account</h2>
            <p>Username: {user.name}</p>
        </div>
    )
}