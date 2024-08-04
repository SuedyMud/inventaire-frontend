import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {FaEnvelope, FaIdBadge, FaUser} from "react-icons/fa";
import {Spinner} from "react-bootstrap";

function Profil() {
    const { user } = useAuth0();

    if (!user) {
        return <Spinner/>;
    }

    return (
        <div>

            <h2>Profil de l'utilisateur</h2>
            <hr />

            <img src={user.picture} alt="Profile" style={{ width: '150px', borderRadius: '50%' }} />
            <p><FaUser /> Nom : {user.name}</p>
            <p><FaEnvelope /> Email :  <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">{user.email}</a></p>
            <p><FaIdBadge /> ID : {user.sub}</p>
        </div>
    );
}

export default Profil;
