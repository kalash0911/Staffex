export const pinButtonsOnScroll = () => {
    const togglePinBtns = () => {
        const screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (screenSize >= 600) return;

        let oldScroll = 0;
        let isUpDirection = false;

        const secretarySection = document.querySelector('.secretary');
        if (!secretarySection) return;
        const botBlock = secretarySection.querySelector('.bot-wrap');
        const secretaryPinBtn = secretarySection.querySelector('#secretaryPinBtn');
        const endBtnPlaceholder = document.querySelector('.pinBtnEnd') as HTMLDivElement;
        endBtnPlaceholder.style.height = `${secretaryPinBtn.getBoundingClientRect().height}px`;

        if (!secretaryPinBtn) return;

        const onEntry: IntersectionObserverCallback = (entry) => {
            entry.forEach((change) => {
                if (change.isIntersecting) {
                    change.target.classList.add('inViewport');
                } else {
                    change.target.classList.remove('inViewport');
                }

                if (change.isIntersecting && !isUpDirection) {
                    secretaryPinBtn.classList.remove('d-none');
                    secretaryPinBtn.classList.add('fixed');
                    secretaryPinBtn.classList.add('transition');
                    setTimeout(() => {
                        secretaryPinBtn.classList.add('slideUp');
                    }, 50);
                    setTimeout(() => {
                        secretaryPinBtn.classList.remove('transition');
                    }, 300);
                }
            });
        };

        /* Scroll anim */

        let options = { threshold: [0.8] };
        let observer = new IntersectionObserver(onEntry, options);
        observer.observe(botBlock);

        const pinBtnEndObs = new IntersectionObserver(
            (entry) => {
                entry.forEach((btn) => {
                    if (btn.isIntersecting) {
                        secretaryPinBtn.classList.remove('fixed');
                        secretaryPinBtn.classList.remove('slideUp');
                        (btn.target as HTMLDivElement).style.height = `0px`;
                    } else {
                        endBtnPlaceholder.style.height = `${secretaryPinBtn.getBoundingClientRect().height}px`;
                    }
                });
            },
            { threshold: 0 },
        );
        pinBtnEndObs.observe(endBtnPlaceholder);

        window.addEventListener('scroll', (event) => {
            isUpDirection = oldScroll > scrollY;
            oldScroll = scrollY;
            const windowHeight = window.innerHeight;
            const btnBottom = secretaryPinBtn.getBoundingClientRect().bottom;
            const botBlockBottom = botBlock.getBoundingClientRect().bottom;

            if (!isUpDirection) {
                return;
            }

            if (
                !secretaryPinBtn.classList.contains('d-none') &&
                !secretaryPinBtn.classList.contains('slideDown') &&
                btnBottom >= windowHeight
            ) {
                secretaryPinBtn.classList.add('fixed');
                secretaryPinBtn.classList.add('slideUp');
                // setTimeout(() => {
                //     secretaryPinBtn.classList.add('transition');
                // }, 350);
            }

            if (!secretaryPinBtn.classList.contains('d-none') && botBlockBottom - 85 >= windowHeight) {
                secretaryPinBtn.classList.add('transition');
                secretaryPinBtn.classList.remove('slideUp');
                setTimeout(() => {
                    secretaryPinBtn.classList.add('d-none');
                }, 150);
            }
        });
    };

    togglePinBtns();

    window.addEventListener('resize', () => {
        togglePinBtns();
    });
};
