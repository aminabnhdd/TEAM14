import logo from '../assets/footer-white.png'
import '../componentsStyles/Footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <img className="footer-logo" src={logo} alt="Logo" />
            <p className="footer-text">
                EQUIPE14 | <span className="footer-brand">ATHAR</span> © 2025
            </p>
        </div>
    )
}
