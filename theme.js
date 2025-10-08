(() => {
  const THEME_KEY = 'portfolio_theme';
  const DEFAULT_THEME = 'light';
  const SUPPORTED_THEMES = ['light', 'ocean', 'rose', 'dark'];

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return SUPPORTED_THEMES.includes(saved) ? saved : null;
    } catch (_) {
      return null;
    }
  }

  function getPreferredTheme() {
    const saved = getSavedTheme();
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return DEFAULT_THEME;
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'light') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', theme);
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {
      /* ignore */
    }
  }

  function initSelector() {
    const select = document.getElementById('theme-select');
    if (!select) return;
    const current = getPreferredTheme();
    select.value = current;
    select.addEventListener('change', (e) => {
      const next = e.target.value;
      if (!SUPPORTED_THEMES.includes(next)) return;
      applyTheme(next);
      saveTheme(next);
    });
  }

  // Initialize as early as possible
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // When DOM is ready, wire selector
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSelector);
  } else {
    initSelector();
  }
})();


