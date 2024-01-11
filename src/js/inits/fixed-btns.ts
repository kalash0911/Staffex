import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animationElementsOnScroll = () => {
    const mm = gsap.matchMedia();
    const tablet = 768;

    mm.add(
        {
            isDesktop: `(min-width: ${tablet}px)`,
            isMobile: `(max-width: ${tablet - 1}px)`,
        },
        (context) => {
            let { isDesktop, isMobile, reduceMotion } = context.conditions;

            gsap.to('.main-section .text', {
                scrollTrigger: {
                    trigger: '.main-section .text',
                    start: 'center center',
                },
                duration: 2,
                opacity: 1,
            });

            gsap.to('.about-section .about-text', {
                scrollTrigger: {
                    trigger: '.about-section .about-text',
                    start: 'center bottom',
                    markers: true,
                },
                duration: 0.5,
                maxWidth: isDesktop ? 520 : '100%',
                maxHeight: isDesktop ? '100%' : 500,
            });
        },
    );
};

export const initFixedBtnsOnScroll = () => {
    const togglePinBtns = () => {
        if (
            !document.querySelector('#secretaryPinBtn') &&
            !document.querySelector('#smmPinBtn') &&
            !document.querySelector('#accountantPinBtn')
        ) {
            return;
        }

        let screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        let secretaryST = ScrollTrigger.create({
            trigger: '#secretaryPinBtn', // Btn id
            pin: true,
            start: 'bottom bottom-=50px',
            end: 'top bottom',
            endTrigger: '.smm-manager', // Next section
            markers: true,
            // onToggle: (self) => console.log('toggled, isActive:', self.isActive),
            // onUpdate: (self) => {
            //   console.log(
            //     'progress:',
            //     self.progress.toFixed(3),
            //     'direction:',
            //     self.direction,
            //     'velocity',
            //     self.getVelocity(),
            //   );
            // },
        });

        let smmST = ScrollTrigger.create({
            trigger: '#smmPinBtn', // Btn id
            pin: true,
            start: 'bottom bottom-=50px',
            end: 'top bottom',
            endTrigger: '.accountant', // Next section
            markers: true,
            // onToggle: (self) => console.log('toggled, isActive:', self.isActive),
            // onUpdate: (self) => {
            //   console.log(
            //     'progress:',
            //     self.progress.toFixed(3),
            //     'direction:',
            //     self.direction,
            //     'velocity',
            //     self.getVelocity(),
            //   );
            // },
        });

        let accountantST = ScrollTrigger.create({
            trigger: '#accountantPinBtn', // Btn id
            pin: true,
            start: 'bottom bottom-=50px',
            end: 'top bottom',
            endTrigger: '.speak-section', // Next section
            markers: true,
            // onToggle: (self) => console.log('toggled, isActive:', self.isActive),
            // onUpdate: (self) => {
            //   console.log(
            //     'progress:',
            //     self.progress.toFixed(3),
            //     'direction:',
            //     self.direction,
            //     'velocity',
            //     self.getVelocity(),
            //   );
            // },
        });

        let isSSrefresh = false;
        let smmRefresh = false;
        let isAccRefresh = false;

        const updateValues = () => {
            // Recalculate positions. Initial properties broken by site animation
            const secretarySection = document.querySelector('.secretary');
            const smmSection = document.querySelector('.smm-manager');
            const accountant = document.querySelector('.accountantaccountant');

            if (!isSSrefresh && secretarySection && ScrollTrigger.isInViewport(secretarySection)) {
                secretaryST.refresh();
                isSSrefresh = true;
            }
            if (!smmRefresh && smmSection && ScrollTrigger.isInViewport(smmSection)) {
                smmST.refresh();
                smmRefresh = true;
            }
            if (!isAccRefresh && accountant && ScrollTrigger.isInViewport(accountant)) {
                accountantST.refresh();
                isAccRefresh = true;
            }
        };

        if (screenSize >= 600) {
            secretaryST.disable();
            smmST.disable();
            accountantST.disable();
        } else {
            secretaryST.enable();
            smmST.enable();
            accountantST.enable();
        }

        ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: updateValues,
        });
    };

    togglePinBtns();

    window.addEventListener('resize', function () {
        togglePinBtns();
    });
};
