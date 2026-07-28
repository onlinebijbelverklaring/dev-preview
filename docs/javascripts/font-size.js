// Standaard font-size schaal (1.0 = 100% van het standaard thema)
let currentScale = parseFloat(localStorage.getItem('user-font-scale')) || 1.0;
const MIN_SCALE = 0.85; // Maximaal 15% kleiner
const MAX_SCALE = 1.45; // Maximaal 45% groter
const STEP = 0.05;      // Stapjes van 5%

function applyFontSize() {
    // Pas het percentage toe op het document root/body element
    const typesetElements = document.getElementsByClassName('md-typeset');
    for (let el of typesetElements) {
        el.style.fontSize = (currentScale * 100) + '%';
    }

    // Onthoud de instelling voor de volgende pagina
    localStorage.setItem('user-font-scale', currentScale);
}

function changeFontSize(direction) {
    let newScale = currentScale + (direction * STEP);
    if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
        currentScale = Math.round(newScale * 100) / 100;
        applyFontSize();
    }
}

function resetFontSize() {
    currentScale = 1.0;
    applyFontSize();
}

// Zorg dat de grootte direct juist staat wanneer de DOM geladen is
document.addEventListener("DOMContentLoaded", applyFontSize);

// Ondersteuning voor Instant Navigation (SPA-navigatie)
if (typeof location$ !== "undefined") {
    location$.subscribe(function() {
        // Korte timeout om te zorgen dat de nieuwe pagina-content geladen is
        setTimeout(applyFontSize, 10);
    });
}