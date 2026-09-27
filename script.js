/**
 * AYAM BEBEK GANJE MAS EKO - Official Demo Concept Scripts
 * Palangka Raya, Kalimantan Tengah
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. STICKY NAVBAR SCROLL BEHAVIOR
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-footer a');

  const openMobileMenu = () => {
    hamburgerBtn.classList.add('active');
    mobileNavDrawer.classList.add('open');
    mobileNavBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMobileMenu = () => {
    hamburgerBtn.classList.remove('active');
    mobileNavDrawer.classList.remove('open');
    mobileNavBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  if (hamburgerBtn && mobileNavDrawer && mobileNavBackdrop) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileNavBackdrop.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. ACTIVE NAV LINK ON SCROLL (SPY)
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 4. MENU FILTERING SYSTEM
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.food-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. GALLERY LIGHTBOX MODAL
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightboxModal && lightboxImg && lightboxCaption && lightboxCloseBtn) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-img');
        const captionText = item.querySelector('.gallery-overlay-text')?.innerText || '';
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Galeri Ganje Mas Eko';
        lightboxCaption.innerText = captionText;
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    lightboxCloseBtn.addEventListener('click', closeLightbox);

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. REAL-TIME OUTLET SEARCH / FILTER
  // --------------------------------------------------------------------------
  const outletSearchInput = document.getElementById('outletSearchInput');
  const outletCards = document.querySelectorAll('.outlet-card');

  if (outletSearchInput) {
    outletSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();

      outletCards.forEach(card => {
        const outletName = card.querySelector('.outlet-name').innerText.toLowerCase();
        const outletDesc = card.querySelector('.outlet-desc').innerText.toLowerCase();

        if (outletName.includes(term) || outletDesc.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. SMOOTH SCROLLING ENHANCEMENT
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
