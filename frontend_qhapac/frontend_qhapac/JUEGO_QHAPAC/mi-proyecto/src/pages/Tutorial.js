import React, { useState, useEffect } from "react";
import "./Tutorial.css";
import "../components/Comun.css";

function Tutorial() {
    const [darkMode, setDarkMode] = useState(false);
    const [faqVisible, setFaqVisible] = useState(false);

    // Mantiene la clase sincronizada con el state; aplica tanto a html como a body.
    useEffect(() => {
        document.documentElement.classList.toggle("dark-mode", darkMode);
        document.body.classList.toggle("dark-mode", darkMode);

        // cleanup (por si el componente se desmonta)
        return () => {
            document.documentElement.classList.remove("dark-mode");
            document.body.classList.remove("dark-mode");
        };
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);
    const toggleFAQ = () => setFaqVisible(prev => !prev);

    return (
        <div className="tutorial-page">
            {/* Video */}
            <div className="video-container">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/BgBNLX_3afs?si=Qi8to_v_wdgozoLP"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="sticky-buttons">
                <button onClick={toggleDarkMode} className="btn dark">
                    {darkMode ? "☀" : "🌙"}
                </button>
                <button onClick={toggleFAQ} className="btn">
                    ❓
                </button>
            </div>

            <div id="faqContainer" className={`faq ${faqVisible ? "" : "hidden"}`}>
                <h3>Preguntas Frecuentes</h3>
                <ul>
                    <li>
                        <b>¿Cómo se juega?</b> Desarrolla cada Periodo para que puedas pasar
                        al siguiente
                    </li>
                    <li>
                        <b>¿Cuántos jugadores?</b> Solo tú, pero puedes competir por el podio
                        con tus amigos
                    </li>
                    <li>
                        <b>¿Hay Versión premium?</b> Por el momento estamos trabajando en una
                        versión premium con más características.
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Tutorial;


