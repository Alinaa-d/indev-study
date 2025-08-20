 require("./style.scss")


document.querySelector('.burger-icon').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.main-nav').classList.toggle('show');
    document.body.classList.toggle('no-scroll');
});


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const blueFilter = document.querySelector('.blue-filter');

    slider.addEventListener('input', function() {
        const value = this.value;
        blueFilter.style.width = `${value}%`;
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                const current = (this.realIndex + 1).toString().padStart(2, '0');
                document.querySelector('.swiper-pagination').textContent = `${current} | 05`;

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
});


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.thumbnails-slider');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const dots = document.querySelectorAll('.slider-carousel-dot');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let visibleCount = window.matchMedia('(max-width: 768px)').matches ? 2 : 3;
    let currentIndex = 0;

    function updateVisibleThumbnails() {
        thumbnails.forEach((thumb, index) => {
            thumb.style.display = (index >= currentIndex && index < currentIndex + visibleCount)
                ? 'block'
                : 'none';
        });
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function handleMediaQueryChange(e) {
        visibleCount = e.matches ? 2 : 3;
        updateVisibleThumbnails();
        updateDots();
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addListener(handleMediaQueryChange);

    handleMediaQueryChange(mediaQuery);
    updateVisibleThumbnails();
    updateDots();

    nextBtn.addEventListener('click', function() {
        if (currentIndex < thumbnails.length - visibleCount) {
            currentIndex++;
            updateVisibleThumbnails();
            updateDots();
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateVisibleThumbnails();
            updateDots();
        }
    });

    updateVisibleThumbnails();

});


 document.addEventListener('DOMContentLoaded', function() {
     document.addEventListener('click', function(e) {
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
     });
 });






