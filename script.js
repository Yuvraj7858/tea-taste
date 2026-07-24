document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile Menu Toggle ---------- */
  const hamburger = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  /* ---------- Mobile Dropdown Toggle (Menu / Celebrations) ---------- */
  const dropdownParents = document.querySelectorAll('.has-dropdown > a');
  dropdownParents.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* Close mobile nav when a normal link is clicked */
  document.querySelectorAll('.main-nav a:not(.has-dropdown > a)').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 860) {
        mainNav.classList.remove('open');
      }
    });
  });

  /* ---------- Simple Slider Helper ---------- */
  function setupSlider(gridId, nextBtnId, prevBtnId, visibleCount) {
    const grid = document.getElementById(gridId);
    const nextBtn = document.getElementById(nextBtnId);
    const prevBtn = prevBtnId ? document.getElementById(prevBtnId) : null;
    if (!grid) return;

    let index = 0;

    function getItemsPerView() {
      const w = window.innerWidth;
      if (w <= 620) return 1;
      if (w <= 940) return 2;
      return visibleCount;
    }

    function update() {
      const items = grid.children.length;
      const perView = getItemsPerView();
      const maxIndex = Math.max(0, items - perView);
      if (index > maxIndex) index = maxIndex;
      const itemWidth = grid.children[0] ? grid.children[0].getBoundingClientRect().width : 0;
      const gap = parseFloat(getComputedStyle(grid).gap || 0);
      const offset = index * (itemWidth + gap);
      grid.style.transform = 'translateX(-' + offset + 'px)';
    }

    grid.style.transition = 'transform .4s ease';
    grid.style.willChange = 'transform';

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        const items = grid.children.length;
        const perView = getItemsPerView();
        const maxIndex = Math.max(0, items - perView);
        index = index >= maxIndex ? 0 : index + 1;
        update();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        const items = grid.children.length;
        const perView = getItemsPerView();
        const maxIndex = Math.max(0, items - perView);
        index = index <= 0 ? maxIndex : index - 1;
        update();
      });
    }
    window.addEventListener('resize', update);
    update();
  }

  setupSlider('comboGrid', 'comboNext', null, 4);
  setupSlider('testiGrid', 'testiNext', 'testiPrev', 4);

  /* ---------- Header shadow on scroll (subtle enhancement) ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
      }
    });
  }

});
