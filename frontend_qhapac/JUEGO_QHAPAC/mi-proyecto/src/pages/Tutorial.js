import React from 'react';
import './Tutorial.css';

const tutorialHTML = `
<!-- Tutorial Start -->
<div class="tutorial-page">

    <!-- Video -->
    <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/BgBNLX_3afs?si=Qi8to_v_wdgozoLP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    </div>

    <!-- Botones flotantes -->
    <div class="sticky-buttons">
        <button id="toggleMode" class="btn dark">🌙</button>
        <button id="faqBtn" class="btn">❓</button>
    </div>

    <!-- FAQ -->
    <div id="faqContainer" class="faq hidden">
        <h3>Preguntas Frecuentes</h3>
        <ul>
            <li><b>¿Cómo se juega?</b> Desarrolla cada Periodo para que puedas pasar al siguiente</li>
            <li><b>¿Cuántos jugadores?</b> Solo tú, pero puedes competir por el podio con tus amigos</li>
            <li><b>¿Hay Versión premium?</b> Por el momento estamos trabajando en una versión premium con más características.</li>
        </ul>
    </div>

</div>

<script>
    // Dropdown perfil
    const perfilBtn = document.getElementById('perfilBtn');
    const dropdown = document.getElementById('dropdownMenu');
    perfilBtn.addEventListener('click', () => dropdown.classList.toggle('hidden'));

    window.addEventListener('click', e => {
        if (!perfilBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // Modo oscuro y FAQ
    const toggleBtn = document.getElementById("toggleMode");
    const faqBtn = document.getElementById("faqBtn");
    const faqContainer = document.getElementById("faqContainer");

    toggleBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark-mode");
        toggleBtn.textContent = document.documentElement.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    faqBtn.addEventListener("click", () => {
        faqContainer.classList.toggle("hidden");
    });

    window.addEventListener("click", (e) => {
        if (!faqBtn.contains(e.target) && !faqContainer.contains(e.target)) {
            faqContainer.classList.add("hidden");
        }
    });
</script>
<!-- Tutorial End -->
`;

function Tutorial() {
    return <div dangerouslySetInnerHTML={{ __html: tutorialHTML }} />;
}

export default Tutorial;
