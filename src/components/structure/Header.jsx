import inventaireLogo from '../../images/logo_Inventaire.jpg';
function Header(){

    return (
        <div className="header">
            <div className="logo">
                <img
                    src={inventaireLogo}
                    alt="Inventaire"
                    onClick={() => { window.location.href = "https://cvchercheurs.ulb.ac.be/Site/repertoire.php" }}
                />
            </div>
        </div>
    )
}
export default Header;



