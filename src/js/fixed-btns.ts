import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initFixedBtnsOnScroll = () => {
    const togglePinBtns = () => {
        let screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        let secretaryST = ScrollTrigger.create({
            trigger: '#secretaryPinBtn', // Btn id
            pin: true,
            start: 'bottom bottom-=50px',
            end: 'top bottom',
            endTrigger: '#smm-manager', // Next section id
            // markers: true,
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
            endTrigger: '#accountant', // Next section id
            // markers: true,
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
            endTrigger: '#speak-section', // Next section id
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

        const updateValues = () => {
            // Recalculate positions. Initial properties broken by site animation
            const secretarySection = document.querySelector('#secretary');
            const smmSection = document.querySelector('#smm-manager');
            const accountant = document.querySelector('#accountant');
            if (secretarySection && ScrollTrigger.isInViewport(secretarySection)) {
                secretaryST.refresh();
            }
            if (smmSection && ScrollTrigger.isInViewport(smmSection)) {
                smmST.refresh();
            }
            if (accountant && ScrollTrigger.isInViewport(accountant)) {
                accountantST.refresh();
            }
        };

        console.log('screenSize: ', screenSize);
        if (screenSize >= 600) {
            console.log(123123);
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
