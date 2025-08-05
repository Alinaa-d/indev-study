document.querySelector('.burger-icon').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.main-nav').classList.toggle('show');
    document.body.classList.toggle('no-scroll');
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


