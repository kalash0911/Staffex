export const initAboutSlider = () => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    function checkScreenSize() {
        var screenWidth = window.innerWidth;
        var threshold = 1024;

        var mySwiper = new Swiper('.about-slider', {
            grabCursor: true,
            freeMode: true,
            speed: 6000,

            autoplay: {
                delay: 2,
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
                    spaceBetween: 140,
                },
            },

            on: {
                init() {
                    this.autoplay.stop();

                    this.el.addEventListener('mouseenter', () => {
                        this.autoplay.start();
                    });

                    this.el.addEventListener('mouseleave', () => {
                        this.autoplay.stop();
                    });
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
