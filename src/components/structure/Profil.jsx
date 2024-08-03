import React from 'react';

function Profil({ user }) {
    return (
        <div>
            <img src={user.picture} alt="Profile" />
            <h2>Profil de l'utilisateur</h2>
            <p>Nom: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>ID utilisateur: {user.sub}</p>
        </div>
    );
}

export default Profil;
