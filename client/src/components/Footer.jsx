// footer compontent at the bottom of pages

import logo from "../assets/Screenshot 2025-03-03 at 8.36.18 PM 1.png"
import '../componentsStyles/Footer.css'

export default function Footer() {
    return (
        <div className="main-footer">
        <div className="footer">
            <img className="footer-logo" src={logo} alt="Logo" />
            <p className="footer-text">
                EQUIPE14 | <span className="footer-brand">ATHAR</span> © 2025
            </p>
        </div>
        </div>
    )
}
