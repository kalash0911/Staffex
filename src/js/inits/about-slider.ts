import { Keyboard, Mousewheel } from 'swiper/modules';

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
                    slidesPerView: 2,
                    spaceBetween: 40,
                },

                850: {
                    slidesPerView: 2,
                    spaceBetween: 80,
                },

                900: {
                    slidesPerView: 2,
                    spaceBetween: 130,
                },

                1050: {
                    slidesPerView: 2,
                    spaceBetween: 300,
                },

                1200: {
                    slidesPerView: 3,
                    spaceBetween: 80,
                },

                1400: {
                    slidesPerView: 3,
                    spaceBetween: 200,
                },

                1441: {
                    slidesPerView: 3,
                    spaceBetween: 140,
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
