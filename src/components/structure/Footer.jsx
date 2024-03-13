import React from 'react';
import logoBas from '../../images/logo_bas.png';

function Footer() {
    return (

        <footer>

            <div className="header">
                <div className="logo">
                    <img
                        src={logoBas}
                        alt="Inventaire"
                    />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
