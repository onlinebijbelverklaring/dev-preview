/* ==========================================================================
   Zensical / Material Content Font Resizer
   ========================================================================== */

(function () {
  const STORAGE_KEY = 'zensical_font_scale_index';
  // Beschikbare schalen: 85%, 100% (standaard), 115%, 130%
  const SCALES = [0.85, 1.0, 1.15, 1.30];
  
  // Haal de opgeslagen index op of gebruik 1 (100%)
  let currentIndex = parseInt(localStorage.getItem(STORAGE_KEY) || '1', 10);

  // Pas de schaal toe op de CSS-variabele
  function applyScale(index) {
    currentIndex = Math.max(0, Math.min(index, SCALES.length - 1));
    const scale = SCALES[currentIndex];
    
    // Zet de CSS variabele op de <html> root
    document.documentElement.style.setProperty('--content-font-scale', scale);
    localStorage.setItem(STORAGE_KEY, currentIndex);
  }

  // Injecteer de widget in de DOM
  function injectWidget() {
    // Voorkom dubbele injectie bij pagina-wissels
    if (document.getElementById('font-size-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'font-size-widget';
    widget.className = 'font-size-widget';
    widget.setAttribute('aria-label', 'Tekstgrootte aanpassen');

    widget.innerHTML = `
      <button type="button" class="font-size-btn" id="fs-decrease" title="Tekst verkleinen">A-</button>
      <button type="button" class="font-size-btn" id="fs-reset" title="Herstellen naar 100%">100%</button>
      <button type="button" class="font-size-btn" id="fs-increase" title="Tekst vergroten">A+</button>
    `;

    document.body.appendChild(widget);

    // Event listeners
    document.getElementById('fs-decrease').addEventListener('click', function() {
      applyScale(currentIndex - 1);
    });
    
    document.getElementById('fs-reset').addEventListener('click', function() {
      applyScale(1);
    });
    
    document.getElementById('fs-increase').addEventListener('click', function() {
      applyScale(currentIndex + 1);
    });

    // Pas direct toe
    applyScale(currentIndex);
  }

  // Direct toepassen tegen 'flikkeren' bij laden
  applyScale(currentIndex);

  // Zorg dat het werkt met Zensical/Material instant loading
  if (typeof document$ !== 'undefined') {
    document$.subscribe(injectWidget);
  } else {
    document.addEventListener('DOMContentLoaded', injectWidget);
  }
})();