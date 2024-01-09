import lottie from 'lottie-web';

export const initLottiesAnimations = () => {
    const config = [
        {
            path: 'files/about-icons',
            names: ['1', '2', '3', '4', '5', '6'],
        },
        {
            path: 'files/accountant-icons',
            names: ['1', '2', '3', '4', '5', '6'],
        },
        {
            path: 'files/other-icons',
            names: ['battery', 'Enegry', 'Percentage'],
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
