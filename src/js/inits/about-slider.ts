
export const initAboutSlider = () => {
    if (!document.querySelector('.about-slider')) return;

    window.addEventListener('load', function () {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });

    function checkScreenSize() {
        var screenWidth = window.innerWidth;
        var threshold = 1025;

        var mySwiper = new Swiper('.about-slider', {
            grabCursor: true,
            speed: 1000,

            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
            },

            mousewheel: {
                invert: false,
                touchReleaseOnEdges: true,
            },

            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },

                1023: {
                    slidesPerView: 3,
                    spaceBetween: 80,
                },

                1300: {
                    slidesPerView: 3,
                    spaceBetween: 114,
                },

                1441: {
                    slidesPerView: 4,
                    spaceBetween: 54,
                },
            },
        } as Record<string, any>);

        if (screenWidth < threshold) {
            mySwiper.destroy();
        } else {
            mySwiper.init();
        }
    }
};
