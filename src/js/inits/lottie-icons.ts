import lottie from 'lottie-web';

export const initLottiesAnimations = () => {
    const config = [
        {
            path: 'files/about-icons',
            names: ['about-icon1', 'about-icon2', 'about-icon3', 'about-icon4', 'about-icon5', 'about-icon6'],
        },
        {
            path: 'files/secretary-icons',
            names: [
                'secretary-icons1',
                'secretary-icons2',
                'secretary-icons3',
                'secretary-icons4',
                'secretary-icons5',
                'secretary-icons6',
            ],
        },
        {
            path: 'files/smm-icons',
            names: ['smm-icons1', 'smm-icons2', 'smm-icons3', 'smm-icons4', 'smm-icons5', 'smm-icons6'],
        },
        {
            path: 'files/accountant-icons',
            names: [
                'accountant-icons1',
                'accountant-icons2',
                'accountant-icons3',
                'accountant-icons4',
                'accountant-icons5',
                'accountant-icons6',
            ],
        },
        {
            path: 'files/other-icons',
            names: ['other-icons1', 'other-icons2', 'other-icons3'],
        },
    ];

    const animationsData = [];

    config.forEach(({ path, names }) => {
        names.forEach((name) => {
            animationsData.push({
                animationName: name,
                jsonPath: new URL(`../../../public/${path}/${name}.json`, import.meta.url),
                // path: `../../public/${path}/${name}.json`,
                elementId: `${name}`,
            });
        });
    });

    const animations = animationsData.map((animationData) => {
        const iconContainer = document.getElementById(animationData.elementId) as HTMLDivElement;

        if (iconContainer) {
            const anim = lottie.loadAnimation({
                container: iconContainer,
                renderer: 'svg',
                loop: true,
                autoplay: false,
                path: animationData.jsonPath.pathname,
                name: animationData.animationName,
            });

            return anim;
        }

        return null;
    });

    const itemCards = document.querySelectorAll('.lotti-anim');

    itemCards.forEach((itemCard, index) => {
        itemCard.addEventListener('mouseenter', () => {
            if (animations[index]) {
                animations?.[index]?.play();
            }
        });

        itemCard.addEventListener('mouseleave', () => {
            if (animations[index]) {
                animations?.[index]?.stop();
            }
        });
    });
};
