import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="principal_footer-content">
        <div className="navbar_footer">
          <Link to="/inicio">Home</Link>
          <Link to="/tutorial">Tutorial</Link>
          <Link to="/puntuaciones">Record</Link>
          <Link to="/inicio">Perfil</Link>
        </div>

        <div className="social-media">
          <div><h3>Síguenos:</h3></div>
          <div className="social-media-logos">
            <a href="#"><img className="so_logo" src="/MEDIA/IMAGES/LOGO/facebook.png" alt="Logo Facebook" title="Facebook" /></a>
            <a href="#"><img className="so_logo" src="/MEDIA/IMAGES/LOGO/linkedin.png" alt="Logo LinkedIn" title="LinkedIn" /></a>
            <a href="#"><img className="so_logo" src="/MEDIA/IMAGES/LOGO/instagram.png" alt="Logo Instagram" title="Instagram" /></a>
            <a href="#"><img className="so_logo" src="/MEDIA/IMAGES/LOGO/pinterest.png" alt="Logo Pinterest" title="Pinterest" /></a>
            <a href="#"><img className="so_logo" src="/MEDIA/IMAGES/LOGO/x.png" alt="Logo X" title="X" /></a>
            <a href="#"><img className="so_logo" src="/MEDIA/IMAGES/LOGO/youtube.png" alt="Logo Youtube" title="Youtube" /></a>
          </div>
        </div>
      </div>

      <div className="secondary_footer-content">
        <div className="secondary_footer-left">
          <div className="alianzas-content">
            <h3>Alianzas:</h3>
            <p>QHAPAC desarrollado por Educa s.a.c es miembro de la Alianza por una Mejor Formación Escolar.</p>
          </div>
          <div className="alianzas-logos">
            <img className="utp-logo" src="/MEDIA/IMAGES/FOOTER/ALIANZAS/utp_logo.png" alt="Logo UTP" title="Universidad Tecnológica del Perú" />
            <img className="educa-logo" src="/MEDIA/IMAGES/FOOTER/ALIANZAS/Ministerio_Educa_logo.png" alt="Logo Ministerio de Educación" title="Ministerio de Educación" />
            <img className="muni_smp-logo" src="/MEDIA/IMAGES/FOOTER/ALIANZAS/Municipio_SMP_logo.png" alt="Logo Municipalidad SMP" title="Municipalidad SMP" />
          </div>
        </div>
        <div className="secondary_footer-right">
          <div className="proyectos-content">
            <h3>Proyectos Lima</h3>
            <p>Este proyecto es financiado con el apoyo de la Comunidad Educativa Pro-Lima de la municipalidad de Lima</p>
          </div>
          <div className="principal_alianza_logo">
            <img className="muni_lima-logo" src="/MEDIA/IMAGES/FOOTER/ALIANZAS/Municipalidad_Lima_logo.jpg" alt="Municipalidad de Lima" title="Municipalidad de Lima" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright Educa s.a.c 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
