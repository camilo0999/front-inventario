import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">Sobre Nosotros</h3>
                    <p className="footer-text">Somos una empresa dedicada a ofrecer los mejores servicios.</p>
                </div>
                <div className="footer-section">
                    <h3 className="footer-title">Contáctanos</h3>
                    <ul className="footer-list">
                        <li className="footer-list-item">Email: contacto@ejemplo.com</li>
                        <li className="footer-list-item">Teléfono: +57 123 456 7890</li>
                        <li className="footer-list-item">Dirección: Calle Falsa 123, Medellín</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3 className="footer-title">Síguenos</h3>
                    <div className="footer-social-icons">
                        <a href="#" className="footer-social-icon">Facebook</a>
                        <a href="#" className="footer-social-icon">Twitter</a>
                        <a href="#" className="footer-social-icon">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="footer-bottom-text">&copy; 2025 Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
