(function() {
  // Configuration for your portfolio versions
  // Edit the URLs and image links. You can host the images on your Vercel project or use placeholders!
  const PORTFOLIOS = [
    { 
      name: 'v1', 
      url: 'https://yashdhokane.vercel.app/', 
      // Using a sleek placeholder image for now. You can replace this with a screenshot of v1.
      image: '/v1.png' 
    },
    { 
      name: 'v2', 
      url: 'https://yashdhokane-v2.vercel.app/', 
      // Using a sleek placeholder image for now. You can replace this with a screenshot of v2.
      image: '/v2.png' 
    }
  ];

  /* --- STYLES --- */
  const CSS = `
    #pc-root {
      position: fixed;
      z-index: 2147483647; /* Ensure it stays on top of everything */
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    /* Floating Action Button (FAB) */
    #pc-fab {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(15, 23, 42, 0.85); /* Dark transparent background */
      border: 1px solid rgba(255, 255, 255, 0.15); /* Subtle white border */
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    #pc-fab:hover {
      transform: scale(1.1);
      background: rgba(30, 41, 59, 0.95);
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    #pc-fab svg {
      width: 22px;
      height: 22px;
      opacity: 0.9;
    }

    /* Modal Overlay */
    #pc-overlay {
      position: fixed;
      inset: 0; /* Top, right, bottom, left = 0 */
      background: rgba(15, 23, 42, 0.9); /* Dark overlay */
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #pc-overlay.pc-open {
      opacity: 1;
      pointer-events: auto;
    }

    /* The glowing orb wrapper */
    #pc-orb-wrapper {
      position: relative;
      width: 800px;
      height: 800px;
      max-width: 100vw;
      max-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Animated Multi-color Glow Layer */
    #pc-orb-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        #6366f1,    /* Indigo/Blue */
        #d946ef,    /* Fuchsia */
        #ffffff,    /* White highlight */
        #3b82f6,    /* Blue */
        #a855f7,    /* Purple */
        #6366f1     /* Back to Indigo */
      );
      filter: blur(80px);
      opacity: 0.7;
      /* We use two animations: one to spin it consistently, one to pulse the colors/intensity */
      animation: pc-spin 8s linear infinite, pc-pulse 5s ease-in-out infinite alternate;
    }

    @keyframes pc-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pc-pulse {
      0% { opacity: 0.5; filter: blur(70px) hue-rotate(0deg); }
      100% { opacity: 0.9; filter: blur(100px) hue-rotate(60deg); }
    }

    /* White Inner Circle for text readability */
    #pc-orb-inner {
      position: absolute;
      inset: 80px; /* How far the white circle is from the edge of the glow */
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 
        inset 0 0 80px rgba(255, 255, 255, 1), /* Soft blend inside */
        0 0 60px rgba(255, 255, 255, 0.8);     /* Soft blend outside */
      z-index: 1;
    }

    /* Close Button (Top right of screen) */
    #pc-close-btn {
      position: absolute;
      top: 30px;
      right: 30px;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      padding: 10px;
      transition: color 0.2s, transform 0.2s;
      z-index: 10;
      outline: none;
    }

    #pc-close-btn:hover {
      color: white;
      transform: scale(1.1);
    }

    #pc-close-btn svg {
      width: 32px;
      height: 32px;
    }

    /* Content Area (Text + Grid) */
    #pc-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      text-align: center;
    }

    /* Heading Text */
    #pc-content h2 {
      font-size: 36px;
      font-weight: 700;
      font-style: italic; /* Match reference image typography */
      color: #1e293b;
      margin: 0 0 40px 0;
      max-width: 450px;
      line-height: 1.1;
      letter-spacing: -0.5px;
    }

    /* Portfolio Cards Grid */
    .pc-grid {
      display: flex;
      gap: 25px;
      justify-content: center;
      perspective: 1000px; /* For 3D tilt effect */
    }

    /* Portfolio Card Link */
    .pc-card {
      position: relative;
      width: 260px;
      height: 160px;
      border-radius: 12px;
      overflow: hidden;
      background: #0f172a;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      cursor: pointer;
      text-decoration: none;
      /* Default 3D tilt facing up */
      transform: rotateX(15deg) translateY(0);
      transform-style: preserve-3d;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Hover effect: Flatten out and pop up */
    .pc-card:hover {
      transform: rotateX(0deg) scale(1.05) translateY(-10px);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.5);
      z-index: 10;
      border-color: rgba(255, 255, 255, 0.8);
    }

    /* Portfolio Image Background */
    .pc-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.6;
      transition: opacity 0.4s ease, transform 0.4s ease;
    }

    .pc-card:hover img {
      opacity: 0.9;
      transform: scale(1.05); /* Slight zoom on image */
    }

    /* The "v1" / "v2" Text Overlay */
    .pc-card-title {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 800;
      color: #ffffff;
      text-shadow: 0 4px 15px rgba(0, 0, 0, 0.8);
      background: rgba(0, 0, 0, 0.3); /* Dark tint over image */
      transition: background 0.4s ease;
      letter-spacing: 1px;
    }

    .pc-card:hover .pc-card-title {
      background: transparent; /* Remove dark tint on hover so image pops */
    }

    /* Responsive Adjustments for Mobile */
    @media (max-width: 768px) {
      #pc-orb-wrapper {
        width: 100vw;
        height: 100vh;
      }
      #pc-orb-glow {
        border-radius: 0;
      }
      #pc-orb-inner {
        inset: 20px;
      }
      .pc-grid {
        flex-direction: column;
        gap: 20px;
      }
      .pc-card {
        width: 240px;
        height: 140px;
        transform: none; /* Disable 3D tilt on mobile */
      }
      .pc-card:hover {
        transform: scale(1.05);
      }
      #pc-content h2 {
        font-size: 28px;
        margin-bottom: 30px;
        max-width: 300px;
      }
      #pc-fab {
        bottom: 20px;
        right: 20px;
      }
    }
  `;

  function init() {
    // 1. Inject CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // 2. Inject Font (Inter) if not available
    if (!document.querySelector('link[href*="family=Inter"]')) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,700;0,800;1,700&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }

    // 3. Create DOM Structure
    const root = document.createElement('div');
    root.id = 'pc-root';

    // The glowing orb modal
    root.innerHTML = `
      <div id="pc-overlay">
        <button id="pc-close-btn" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div id="pc-orb-wrapper">
          <div id="pc-orb-glow"></div>
          <div id="pc-orb-inner"></div>
          
          <div id="pc-content">
            <h2>Navigate between different versions of my portfolio.</h2>
            
            <div class="pc-grid">
              ${PORTFOLIOS.map(p => `
                <a href="${p.url}" class="pc-card" target="_blank" rel="noopener noreferrer">
                  <img src="${p.image}" alt="${p.name} screenshot" loading="lazy" />
                  <div class="pc-card-title">${p.name}</div>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <button id="pc-fab" aria-label="Open Portfolio Hub">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <!-- A sleek minimal layers or compass icon -->
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      </button>
    `;

    document.body.appendChild(root);

    // 4. Add Interactivity logic
    const fab = document.getElementById('pc-fab');
    const overlay = document.getElementById('pc-overlay');
    const closeBtn = document.getElementById('pc-close-btn');

    let isOpen = false;

    function openModal() {
      isOpen = true;
      overlay.classList.add('pc-open');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
      isOpen = false;
      overlay.classList.remove('pc-open');
      document.body.style.overflow = ''; // Restore scrolling
    }

    // Event Listeners
    fab.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Click outside of the orb-wrapper to close
    overlay.addEventListener('click', (e) => {
      // If user clicks directly on the overlay background (not the inner content), close it
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Press Escape to close
    document.addEventListener('keydown', (e) => {
      if (isOpen && e.key === 'Escape') {
        closeModal();
      }
    });
  }

  // Run initialiser
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
