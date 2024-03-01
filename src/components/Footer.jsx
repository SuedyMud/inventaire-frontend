import React from 'react';
import logoULB from '../images/logo_ulb_bleu.png';
import {Col, Container, Image, Row} from "react-bootstrap";

function Footer() {
    return (

        <footer>

           {/* <Container>
                <Row>
                    <Col xs={4} md={2} className="text-center">  Centre l'image
                        <Image src={logoULB} rounded style={{ width: '150px', height: 'auto' }} />  Modifie la taille de l'image
                    </Col>
                    <Col xs={8} md={6} className="text-md-right mt-3 mt-md-0">  Déplace le texte à droite dans les écrans de taille moyenne et plus grands
                        <p className="mb-0">Université libre de Bruxelles</p>
                    </Col>
                </Row>
            </Container>*/}

           {/* <div>



                <Image src=""
                <img src={logoULB} alt="Logo ULB" style={{ width: '50px', borderRadius: '5px', marginLeft: '10px' }} />
                <p className="mb-0 ml-2"> Université libre de Bruxelles</p>
                 <p className="mb-0">&copy; 2023 ULB. Tous droits réservés.</p>
            </div>*/}
        </footer>

      /*  <footer className="fixed-bottom" style={{ backgroundColor: '#03224C', color: 'white', padding: '7px' , borderRadius: '5px'}}>
            <div className="d-flex align-items-end">
                
                <img src={logoULB} alt="Logo ULB" style={{ width: '50px', borderRadius: '5px', marginLeft: '10px' }} />
                <p className="mb-0 ml-2"> Université libre de Bruxelles</p>
                {/!* <p className="mb-0">&copy; 2023 ULB. Tous droits réservés.</p> *!/}
            </div>
        </footer>*/
    );
}

export default Footer;
