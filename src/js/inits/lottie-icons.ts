import lottie from 'lottie-web';

type AnimationData = {
    animationName: string;
    jsonPath: URL;
    path: string;
    elementSelector: string;
}

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
            // names: ['battery', 'energy', 'percentage'],
            names: ['percentage'],
        },
    ];

    const animationsData: AnimationData[] = [];

    config.forEach(({ path, names }) => {
        names.forEach((name) => {
            animationsData.push({
                animationName: name,
                jsonPath: new URL(`../../../public/${path}/${name}.json`, import.meta.url),
                path: `../../public/${path}/${name}.json`,
                elementSelector: `${name}`,
            });
        });
    });

    let animations = [];

    animationsData.forEach((animationData) => {
        const iconContainers = document.querySelectorAll(`.${animationData.elementSelector}`) as NodeListOf<HTMLDivElement>;

        if (iconContainers.length) {
            return [...iconContainers].forEach((iconContainer, ind) => {
                const anim = lottie.loadAnimation({
                    container: iconContainer,
                    renderer: 'svg',
                    loop: true,
                    autoplay: false,
                    path: animationData.jsonPath.pathname,
                    name: `${animationData.animationName}-${ind}`,
                });

                // @ts-ignore
                (anim.wrapper.closest('.lotti-anim') as HTMLDivElement).addEventListener('mouseenter', () => {
                    anim.play();
                });
                // @ts-ignore
                (anim.wrapper.closest('.lotti-anim') as HTMLDivElement).addEventListener('mouseleave', () => {
                    anim.stop();
                });

                animations.push(anim);
            });
        }
        return null;
    });

    // HOTFIX for 2 icons
    const energyContainers = document.querySelectorAll(`.energy`);
    energyContainers.forEach((container) => {
        const energyIcon = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            path: new URL(`../../../public/files/other-icons/energy.json`, import.meta.url).pathname,
            // name: animationData.animationName,
        });
        // @ts-ignore
        (energyIcon.wrapper.closest('.lotti-anim') as HTMLDivElement).addEventListener('mouseenter', () => {
            energyIcon.play();
        });
        // @ts-ignore
        (energyIcon.wrapper.closest('.lotti-anim') as HTMLDivElement).addEventListener('mouseleave', () => {
            energyIcon.stop();
        });
    });

    const batteryContainers = document.querySelectorAll(`.battery`);
    batteryContainers.forEach((container) => {
        const batteryIcon = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            path: new URL(`../../../public/files/other-icons/battery.json`, import.meta.url).pathname,
            // name: animationData.animationName,
        });
        // @ts-ignore
        (batteryIcon.wrapper.closest('.lotti-anim') as HTMLDivElement).addEventListener('mouseenter', () => {
            batteryIcon.play();
        });
        // @ts-ignore
        (batteryIcon.wrapper.closest('.lotti-anim') as HTMLDivElement).addEventListener('mouseleave', () => {
            batteryIcon.stop();
        });
    });
};
