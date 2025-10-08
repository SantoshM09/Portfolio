(function () {
  function initCarousel(root) {
    const track = root.querySelector('.projects-track');
    const slides = Array.from(root.querySelectorAll('.project-slide'));
    const btnPrev = root.querySelector('[data-dir="prev"]');
    const btnNext = root.querySelector('[data-dir="next"]');
    const dotsWrap = root.querySelector('.projects-dots');
    let index = 0;

    function update() {
      const x = `translateX(${-index * 100}%)`;
      track.style.transform = x;
      Array.from(dotsWrap.children).forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
    }

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'projects-dot';
      dot.type = 'button';
      dot.addEventListener('click', () => { index = i; update(); });
      dotsWrap.appendChild(dot);
    });

    function prev() { index = (index - 1 + slides.length) % slides.length; update(); }
    function next() { index = (index + 1) % slides.length; update(); }

    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);

    // Swipe support
    let startX = 0; let delta = 0; let dragging = false;
    track.addEventListener('pointerdown', (e) => { dragging = true; startX = e.clientX; track.setPointerCapture(e.pointerId); });
    track.addEventListener('pointermove', (e) => { if (!dragging) return; delta = e.clientX - startX; track.style.transform = `translateX(${(-index * 100) + (delta / track.clientWidth) * 100}%)`; });
    track.addEventListener('pointerup', () => { dragging = false; if (Math.abs(delta) > track.clientWidth * 0.15) { delta < 0 ? next() : prev(); } else { update(); } delta = 0; });

    // Keyboard
    root.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); });

    update();
  }

  function boot() {
    document.querySelectorAll('.projects-carousel').forEach(initCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();


