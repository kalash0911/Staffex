import lottie from 'lottie-web';

document.addEventListener('DOMContentLoaded', async () => {
    const numberOfAnimations = 4;

    const animationsData = Array.from(
        { length: numberOfAnimations },
        (_, index) => {
            const animationNumber = index + 1;
            return {
                animationName: `${animationNumber}`,
                jsonPath: new URL(
                    `../../public/files/about-icons/${animationNumber}.json`,
                    import.meta.url,
                ),
                elementId: `${animationNumber}`,
            };
        },
    );

    const animations = animationsData.map((animationData) => {
        const iconContainer = document.getElementById(
            animationData.elementId,
        ) as HTMLDivElement;

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
});
