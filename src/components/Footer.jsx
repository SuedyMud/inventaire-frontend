import React from 'react';
import logoULB from '../images/logo_ulb_bleu.png';

function Footer() {
    return (
        <footer className="fixed-bottom" style={{ backgroundColor: '#03224C', color: 'white', padding: '7px' , borderRadius: '5px'}}>
            <div className="d-flex align-items-end">
                
                <img src={logoULB} alt="Logo ULB" style={{ width: '50px', borderRadius: '5px', marginLeft: '10px' }} />
                <p className="mb-0 ml-2">Université libre de Bruxelles</p>
                {/* <p className="mb-0">&copy; 2023 ULB. Tous droits réservés.</p> */}
            </div>
        </footer>
    );
}

export default Footer;
