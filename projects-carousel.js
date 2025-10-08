(function () {
  function initCarousel(root) {
    const track = root.querySelector('.projects-track');
    const slides = Array.from(root.querySelectorAll('.project-slide'));
    const btnPrev = root.querySelector('[data-dir="prev"]');
    const btnNext = root.querySelector('[data-dir="next"]');
    const dotsWrap = root.querySelector('.projects-dots');
    let index = 0;
    let autoTimer = null;
    const AUTO_MS = 4000;

    function update() {
      const slideWidth = 280 + 16; // slide width + gap
      const x = `translateX(${-index * slideWidth}px)`;
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

    function prev() { 
      index = (index - 1 + slides.length) % slides.length; 
      update(); 
    }
    function next() { 
      index = (index + 1) % slides.length; 
      update(); 
    }

    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);

    // Swipe support
    let startX = 0; let delta = 0; let dragging = false;
    track.addEventListener('pointerdown', (e) => { dragging = true; startX = e.clientX; track.setPointerCapture(e.pointerId); });
    track.addEventListener('pointermove', (e) => { if (!dragging) return; delta = e.clientX - startX; track.style.transform = `translateX(${(-index * 100) + (delta / track.clientWidth) * 100}%)`; });
    track.addEventListener('pointerup', () => { dragging = false; if (Math.abs(delta) > track.clientWidth * 0.15) { delta < 0 ? next() : prev(); } else { update(); } delta = 0; });

    // Keyboard
    root.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); });

    // Autoplay controls
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, AUTO_MS);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }
    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', startAuto);
    root.addEventListener('focusin', stopAuto);
    root.addEventListener('focusout', startAuto);
    document.addEventListener('visibilitychange', () => { document.hidden ? stopAuto() : startAuto(); });

    update();
    startAuto();
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


