export const initFeatureChoose = () => {
    const elementItems = document.querySelectorAll('.element-item');
    const mainVideo = document.querySelector('.bot-video-el') as HTMLVideoElement;
    const botElements = document.querySelectorAll('.bot-element') as NodeListOf<HTMLVideoElement>;

    if (elementItems.length > 0 && botElements.length > 0) {
        function addActiveClass(event) {
            event.currentTarget.classList.toggle('active');

            const botElementIndex = Array.from(elementItems).indexOf(event.currentTarget);
            const correspondingBotElement = botElements[botElementIndex];

            correspondingBotElement.classList.toggle('active');
            // correspondingBotElement.currentTime = mainVideo.currentTime;
        }

        botElements.forEach((video) => {
            video.currentTime = mainVideo.currentTime;
        });

        elementItems.forEach((elementItem) => {
            elementItem.addEventListener('click', addActiveClass);
        });
    }
};
