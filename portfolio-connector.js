(function() {
  // Configuration for your portfolio versions
  // Edit the URLs, names, and descriptions below.
  const PORTFOLIOS = [
    { name: 'Portfolio v1', url: 'https://v1.example.com', description: 'Early work & legacy projects' },
    { name: 'Portfolio v2 (Gatsby)', url: 'https://v2.example.com', description: 'Static site generation era' },
    { name: 'Portfolio v3 (Next.js)', url: 'https://v3.example.com', description: 'Full stack applications' },
    { name: 'Portfolio v4 (Vite)', url: 'https://v4.example.com', description: 'Modern React & animations' },
  ];

  // Design Theme
  const THEME = {
    primary: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
    bg: 'rgba(15, 23, 42, 0.85)',
    border: 'rgba(255, 255, 255, 0.1)',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    hover: 'rgba(255, 255, 255, 0.05)',
  };

  const CSS = `
    #portfolio-connector-root {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 2147483647; /* Max z-index to ensure it is always on top */
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
    
    #pc-fab {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: ${THEME.gradient};
      border: none;
      color: white;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      outline: none;
    }
    
    #pc-fab::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 34px;
      background: ${THEME.gradient};
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
      filter: blur(8px);
    }
    
    #pc-fab:hover {
      transform: scale(1.05) translateY(-2px);
    }

    #pc-fab:hover::before {
      opacity: 0.6;
    }
    
    #pc-fab svg {
      width: 24px;
      height: 24px;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    #pc-fab.pc-open {
      background: rgba(30, 41, 59, 0.9);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }
    
    #pc-fab.pc-open::before {
      opacity: 0;
    }

    #pc-fab.pc-open svg {
      transform: rotate(135deg);
    }
    
    #pc-menu {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 320px;
      background: ${THEME.bg};
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid ${THEME.border};
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      transform-origin: bottom right;
    }
    
    #pc-menu.pc-open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    
    #pc-header {
      margin-bottom: 20px;
    }
    
    #pc-header h3 {
      margin: 0 0 6px 0;
      font-size: 18px;
      font-weight: 600;
      color: ${THEME.text};
      letter-spacing: -0.01em;
    }
    
    #pc-header p {
      margin: 0;
      font-size: 13px;
      color: ${THEME.textMuted};
      line-height: 1.4;
    }
    
    .pc-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .pc-item {
      display: flex;
      flex-direction: column;
      padding: 14px 16px;
      border-radius: 14px;
      text-decoration: none;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid transparent;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .pc-item:hover {
      background: ${THEME.hover};
      border-color: ${THEME.border};
      transform: translateX(6px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .pc-item-name {
      font-size: 15px;
      font-weight: 500;
      color: ${THEME.text};
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .pc-item-desc {
      font-size: 13px;
      color: ${THEME.textMuted};
    }
    
    .pc-badge {
      font-size: 10px;
      padding: 3px 8px;
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      border-radius: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    @media (max-width: 480px) {
      #portfolio-connector-root {
        bottom: 20px;
        right: 20px;
      }
      #pc-menu {
        width: calc(100vw - 40px);
        max-width: 320px;
      }
    }
  `;

  function init() {
    // 1. Add CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // 2. Add Font (Inter) if not already present
    if (!document.querySelector('link[href*="family=Inter"]')) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }

    // 3. Create DOM Structure
    const root = document.createElement('div');
    root.id = 'portfolio-connector-root';

    // SVG icon (Compass/Connection/Plus)
    const fabIcon = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    `;

    const menuHtml = `
      <div id="pc-menu">
        <div id="pc-header">
          <h3>Portfolio Hub</h3>
          <p>Navigate between different versions of my portfolio.</p>
        </div>
        <div class="pc-list">
          ${PORTFOLIOS.map((p, i) => `
            <a href="${p.url}" class="pc-item">
              <span class="pc-item-name">
                ${p.name}
                ${i === PORTFOLIOS.length - 1 ? '<span class="pc-badge">Latest</span>' : ''}
              </span>
              <span class="pc-item-desc">${p.description}</span>
            </a>
          `).join('')}
        </div>
      </div>
      <button id="pc-fab" aria-label="Toggle Portfolio Menu">
        ${fabIcon}
      </button>
    `;

    root.innerHTML = menuHtml;
    document.body.appendChild(root);

    // 4. Add Interactivity
    const fab = document.getElementById('pc-fab');
    const menu = document.getElementById('pc-menu');
    let isOpen = false;

    function toggleMenu() {
      isOpen = !isOpen;
      if (isOpen) {
        menu.classList.add('pc-open');
        fab.classList.add('pc-open');
      } else {
        menu.classList.remove('pc-open');
        fab.classList.remove('pc-open');
      }
    }

    fab.addEventListener('click', toggleMenu);

    // Close on click outside or escape key
    document.addEventListener('click', (e) => {
      if (isOpen && !root.contains(e.target)) {
        toggleMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (isOpen && e.key === 'Escape') {
        toggleMenu();
      }
    });
  }

  // Run on load or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
