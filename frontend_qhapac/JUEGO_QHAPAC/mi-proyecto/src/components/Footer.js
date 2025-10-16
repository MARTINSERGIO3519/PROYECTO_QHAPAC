import React from 'react';
import './Footer.css';

const footerHTML = `
<footer>
    <div class="principal_footer-content">
        <div class="navbar_footer">
            <a href="#">Home</a>
            <a href="#" class="active">Tutorial</a>
            <a href="#">Record</a>
            <a href="#">Perfil</a>
        </div>

        <div class="social-media">
            <div><h3>Síguenos:</h3></div>
            <div class="social-media-logos">
                <a href="#"><img class="so_logo" src="/MEDIA/IMAGES/LOGO/facebook.png" alt="Logo Facebook" title="Facebook"></a>
                <a href="#"><img class="so_logo" src="/MEDIA/IMAGES/LOGO/linkedin.png" alt="Logo LinkedIn" title="LinkedIn"></a>
                <a href="#"><img class="so_logo" src="/MEDIA/IMAGES/LOGO/instagram.png" alt="Logo Instagram" title="Instagram"></a>
                <a href="#"><img class="so_logo" src="/MEDIA/IMAGES/LOGO/pinterest.png" alt="Logo Pinterest" title="Pinterest"></a>
                <a href="#"><img class="so_logo" src="/MEDIA/IMAGES/LOGO/x.png" alt="Logo X" title="X"></a>
                <a href="#"><img class="so_logo" src="/MEDIA/IMAGES/LOGO/youtube.png" alt="Logo Youtube" title="Youtube"></a>
            </div>
        </div>
    </div>

    <div class="secondary_footer-content">
        <div class="secondary_footer-left">
            <div class="alianzas-content">
                <h3>Alianzas:</h3>
                <p>QHAPAC desarrollado por Educa s.a.c es miembro de la Alianza por una Mejor Formación Escolar.</p>
            </div>
            <div class="alianzas-logos">
                <img class="utp-logo" src="/MEDIA/IMAGES/FOOTER/ALIANZAS/utp_logo.png" alt="Logo UTP" title="Universidad Tecnológica del Perú">
                <img class="educa-logo" src="/MEDIA/IMAGES/FOOTER/ALIANZAS/Ministerio_Educa_logo.png" alt="Logo Ministerio de Educación" title="Ministerio de Educación">
                <img class="muni_smp-logo" src="/MEDIA/IMAGES/FOOTER/ALIANZAS/Municipio_SMP_logo.png" alt="Logo Municipalidad SMP" title="Municipalidad SMP">
            </div>
        </div>
        <div class="secondary_footer-right">
            <div class="proyectos-content">
                <h3>Proyectos Lima</h3>
                <p>Este proyecto es financiado con el apoyo de la Comunidad Educativa Pro-Lima de la municipalidad de Lima</p>
            </div>
            <div class="principal_alianza_logo">
                <img class="muni_lima-logo" src="/MEDIA/IMAGES/FOOTER/ALIANZAS/Municipalidad_Lima_logo.jpg" alt="Municipalidad de Lima" title="Municipalidad de Lima">
            </div>
        </div>
    </div>

    <div class="footer-bottom">
        <p>© Copyright Educa s.a.c 2025</p>
    </div>
</footer>
`;

function Footer() {
    return <div dangerouslySetInnerHTML={{ __html: footerHTML }} />;
}

export default Footer;
