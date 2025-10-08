(function () {
  const html = document.documentElement;
  function update() {
    const y = window.scrollY || window.pageYOffset || 0;
    // Blur from 8px up to 16px based on first 400px of scroll
    const min = 8;
    const max = 16;
    const range = Math.max(0, Math.min(1, y / 400));
    const blur = (min + (max - min) * range).toFixed(2) + 'px';
    html.style.setProperty('--header-blur', blur);
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
})();


