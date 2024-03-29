export const pinButtonsOnScroll = () => {
    const togglePinBtns = () => {
        const screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (screenSize >= 600) return;

        const sectionSelectors = ['.secretary', '.smm-manager', '.accountant'];

        sectionSelectors.forEach((selector) => {
            let oldScroll = 0;
            let isUpDirection = false;
            const section = document.querySelector(selector);
            if (!section) return;
            const botBlock = section.querySelector('.info-block') as HTMLDivElement;
            const sectionPinBtn = section.querySelector('.pinBtn') as HTMLDivElement;
            const endBtnPlaceholder = section.querySelector('.pinBtnEnd') as HTMLDivElement;

            endBtnPlaceholder.style.height = `${sectionPinBtn.getBoundingClientRect().height}px`;

            if (!sectionPinBtn) return;

            const onEntry: IntersectionObserverCallback = (entry) => {
                entry.forEach((change) => {
                    if (change.isIntersecting) {
                        change.target.classList.add('inViewport');
                    } else {
                        change.target.classList.remove('inViewport');
                    }

                    if (change.isIntersecting && !isUpDirection) {
                        sectionPinBtn.classList.remove('d-none');
                        sectionPinBtn.classList.add('fixed');
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
                            sectionPinBtn.classList.remove('fixed');
                            // (btn.target as HTMLDivElement).style.height = `0px`;
                        } else {
                            endBtnPlaceholder.style.height = `${sectionPinBtn.getBoundingClientRect().height}px`;
                        }
                    });
                },
                { threshold: 0 },
            );
            pinBtnEndObs.observe(endBtnPlaceholder);

            window.addEventListener('scroll', () => {
                isUpDirection = oldScroll > scrollY;
                oldScroll = scrollY;
                const windowHeight = window.innerHeight;
                const btnBottom = sectionPinBtn.getBoundingClientRect().bottom;
                const botBlockBottom = botBlock.getBoundingClientRect().bottom;

                if (!isUpDirection) {
                    return;
                }

                if (!sectionPinBtn.classList.contains('d-none') && btnBottom >= windowHeight) {
                    sectionPinBtn.classList.add('fixed');
                    // setTimeout(() => {
                    //     secretaryPinBtn.classList.add('transition');
                    // }, 350);
                }

                if (!sectionPinBtn.classList.contains('d-none') && botBlockBottom - 85 >= windowHeight) {
                    sectionPinBtn.classList.add('d-none');
                }
            });
        });
    };

    togglePinBtns();

    window.addEventListener('resize', () => {
        togglePinBtns();
    });
};
