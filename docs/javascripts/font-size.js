// Standaard font-size factor
let currentScale = parseFloat(localStorage.getItem('user-font-scale')) || 1.0;
const MIN_SCALE = 0.8;  // Maximaal 20% kleiner
const MAX_SCALE = 1.4;  // Maximaal 40% groter
const STEP = 0.05;      // Elke klik is 5% groter/kleiner

function applyFontSize() {
    // Pas de schaal aan op het hoofdelement
    const root = document.documentElement;
    root.style.setProperty('--md-typeset-font-size', (0.8 * currentScale) + 'rem');
    
    // Directe stijlaanpassing op de content container
    const typesetElements = document.getElementsByClassName('md-typeset');
    for (let el of typesetElements) {
        el.style.fontSize = (currentScale * 100) + '%';
    }

    // Onthoud de instelling in de browser
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

// Direct toepassen bij eerste pagina-load
document.addEventListener("DOMContentLoaded", applyFontSize);

// Ondersteuning voor snelle navigatie zonder herladen (Instant Navigation)
if (typeof location$ !== "undefined") {
    location$.subscribe(function() {
        applyFontSize();
    });
}