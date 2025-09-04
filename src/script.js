require('./style.scss');

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.burger-icon').addEventListener('click', function () {
    this.classList.toggle('active');
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
  });

  const slider = document.getElementById('slider');
  const blueFilter = document.querySelector('.blue-filter');

  if (slider && blueFilter) {
    slider.addEventListener('input', function () {
      const value = this.value;
      blueFilter.style.width = `${value}%`;
    });
  }

  const swiperElement = document.querySelector('.swiper');
  if (swiperElement) {
    const slides = document.querySelectorAll('.swiper-slide');
    const totalSlides = slides.length;
    const totalFormatted = totalSlides.toString().padStart(2, '0');

    const pagination = document.createElement('div');
    pagination.className = 'swiper-pagination';
    pagination.textContent = `01 | ${totalFormatted}`;

    let controlsContainer = document.querySelector('.swiper-controls');
    if (!controlsContainer) {
      controlsContainer = document.createElement('div');
      controlsContainer.className = 'swiper-controls';
      swiperElement.appendChild(controlsContainer);
    }

    controlsContainer.insertBefore(pagination, controlsContainer.firstChild);

    const swiper = new Swiper('.swiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: function () {
          const current = (this.realIndex + 1).toString().padStart(2, '0');
          const pagination = document.querySelector('.swiper-pagination');
          if (pagination) {
            pagination.textContent = `${current} | ${totalFormatted}`;
          }

          const dots = document.querySelectorAll('.swiper-carousel-dot');
          dots.forEach((dot, index) => {
            if (index === this.realIndex) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        },
      },
    });
  }

  const thumbnailsSlider = document.querySelector('.thumbnails-slider');
  if (thumbnailsSlider) {
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const dots = document.querySelectorAll('.slider-carousel-dot');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    let visibleCount = mediaQuery768.matches ? 2 : 3;
    let currentIndex = 0;

    function updateVisibleThumbnails() {
      thumbnails.forEach((thumb, index) => {
        thumb.style.display =
          index >= currentIndex && index < currentIndex + visibleCount ? 'block' : 'none';
      });
    }

    function updateDots() {
      dots.forEach((dot) => dot.classList.remove('active'));
      if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
      }
    }

    function handleMediaQueryChange(e) {
      visibleCount = e.matches ? 2 : 3;
      updateVisibleThumbnails();
      updateDots();
    }

    mediaQuery768.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery768);
    updateVisibleThumbnails();
    updateDots();

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (currentIndex < thumbnails.length - visibleCount) {
          currentIndex++;
          updateVisibleThumbnails();
          updateDots();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
          currentIndex--;
          updateVisibleThumbnails();
          updateDots();
        }
      });
    }
    updateVisibleThumbnails();
  }

  const basicTickets = document.getElementById('basic');
  const seniorTickets = document.getElementById('senior');

  function calculateAndDisplayTotal() {
    const basicCount = parseInt(basicTickets.value) || 0;
    const seniorCount = parseInt(seniorTickets.value) || 0;

    const basicPrice = 20;
    const seniorPrice = 10;

    const basicTotal = basicCount * basicPrice;
    const seniorTotal = seniorCount * seniorPrice;
    const overallTotal = basicTotal + seniorTotal;

    document.getElementById('total-display').textContent = `Total €${overallTotal}`;

    return {
      basicTotal,
      seniorTotal,
      overallTotal,
    };
  }

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('increment')) {
      const input = e.target.previousElementSibling;
      if (input && input.type === 'number') {
        input.value = (parseInt(input.value) || 0) + 1;
      }
    }

    if (e.target.classList.contains('decrement')) {
      const input = e.target.nextElementSibling;
      if (input && input.type === 'number') {
        const value = parseInt(input.value) || 0;
        const min = parseInt(input.getAttribute('min')) || 0;
        if (value > min) {
          input.value = value - 1;
        }
      }
    }
    calculateAndDisplayTotal();
  });

  calculateAndDisplayTotal();

  function goToBooking() {
    const prices = calculateAndDisplayTotal();

    localStorage.setItem('basicTickets', basicTickets.value);
    localStorage.setItem('seniorTickets', seniorTickets.value);
    localStorage.setItem('basicTotal', prices.basicTotal.toString());
    localStorage.setItem('seniorTotal', prices.seniorTotal.toString());
    localStorage.setItem('overallTotal', prices.overallTotal.toString());

    window.location.href = 'booking.html';
  }

  document.querySelector('.buy-now').addEventListener('click', function (e) {
    e.preventDefault();
    goToBooking();
  });
});
