/* ==========================================================================
   Zensical / Material Content Font Resizer (TOC Integratie)
   ========================================================================== */

(function () {
  const STORAGE_KEY = 'zensical_font_scale_index';
  // Beschikbare schalen: 85%, 100% (standaard), 115%, 130%
  const SCALES = [0.85, 1.0, 1.15, 1.30];
  
  let currentIndex = parseInt(localStorage.getItem(STORAGE_KEY) || '1', 10);

  // Pas de schaal toe op de CSS-variabele
  function applyScale(index) {
    currentIndex = Math.max(0, Math.min(index, SCALES.length - 1));
    const scale = SCALES[currentIndex];
    
    document.documentElement.style.setProperty('--content-font-scale', scale);
    localStorage.setItem(STORAGE_KEY, currentIndex);
  }

  // Injecteer de knoppen direct bovenaan de TOC-sidebar
  function injectWidgetInTOC() {
    // Verwijder eventuele oude zwevende widget als die er nog is
    const oldFloatingWidget = document.getElementById('font-size-widget');
    if (oldFloatingWidget) oldFloatingWidget.remove();

    // Zoek het navigatieblok van de TOC (rechterkolom)
    const tocContainer = document.querySelector('.md-sidebar--secondary .md-nav--secondary');
    if (!tocContainer) return; // Pagina heeft geen TOC (bijv. als TOC verborgen is via hide)

    // Voorkom dubbele injectie bij Instant Loading
    if (tocContainer.querySelector('.font-size-toc-container')) return;

    const widgetWrapper = document.createElement('div');
    widgetWrapper.className = 'font-size-toc-container';

    widgetWrapper.innerHTML = `
      <div class="font-size-buttons">
        <button type="button" class="font-size-btn" id="fs-decrease" title="Tekst verkleinen">A-</button>
        <button type="button" class="font-size-btn" id="fs-reset" title="Herstellen naar 100%">100%</button>
        <button type="button" class="font-size-btn" id="fs-increase" title="Tekst vergroten">A+</button>
      </div>
    `;

    // Voeg toe direct onder de TOC-titel
    const tocTitle = tocContainer.querySelector('.md-nav__title');
    if (tocTitle && tocTitle.nextSibling) {
      tocContainer.insertBefore(widgetWrapper, tocTitle.nextSibling);
    } else {
      tocContainer.prepend(widgetWrapper);
    }

    // Event listeners koppelen
    widgetWrapper.querySelector('#fs-decrease').addEventListener('click', function() {
      applyScale(currentIndex - 1);
    });
    
    widgetWrapper.querySelector('#fs-reset').addEventListener('click', function() {
      applyScale(1);
    });
    
    widgetWrapper.querySelector('#fs-increase').addEventListener('click', function() {
      applyScale(currentIndex + 1);
    });

    applyScale(currentIndex);
  }

  // Direct schaal toepassen tegen flikkeren
  applyScale(currentIndex);

  // Zorg voor compatibiliteit met instant page loading van Zensical/Material
  if (typeof document$ !== 'undefined') {
    document$.subscribe(injectWidgetInTOC);
  } else {
    document.addEventListener('DOMContentLoaded', injectWidgetInTOC);
  }
})();