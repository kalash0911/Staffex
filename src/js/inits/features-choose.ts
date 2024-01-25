import { SECRETARY_FEATURES_KEY } from '../react-form/constants/form';

export const initFeatureChoose = () => {
    const elementItems = document.querySelectorAll('.element-item') as NodeListOf<HTMLDivElement>;
    const mainVideo = document.querySelector('.bot-video-el') as HTMLVideoElement;
    const botElements = document.querySelectorAll('.bot-element') as NodeListOf<HTMLVideoElement>;

    const localSaves = localStorage.getItem(SECRETARY_FEATURES_KEY);

    const features = localSaves
        ? JSON.parse(localSaves)
        : localStorage.getItem(SECRETARY_FEATURES_KEY) || {
              communicationCoordination: false,
              voiceRecognation: false,
              documentPreparation: false,
              crm: false,
          };

    localStorage.setItem(SECRETARY_FEATURES_KEY, JSON.stringify(features));

    if (elementItems.length > 0 && botElements.length > 0) {
        function chooseFeature(event: any) {
            event.currentTarget.classList.toggle('active');
            const featureName = event.currentTarget.dataset.feature;
            features[featureName] = !features[featureName];
            localStorage.setItem(SECRETARY_FEATURES_KEY, JSON.stringify(features));

            const botElementIndex = Array.from(elementItems).indexOf(event.currentTarget);
            const correspondingBotElement = botElements[botElementIndex];

            correspondingBotElement.classList.toggle('active');
            // correspondingBotElement.currentTime = mainVideo.currentTime;
        }

        botElements.forEach((video) => {
            video.currentTime = mainVideo.currentTime;
        });

        elementItems.forEach((elementItem) => {
            elementItem.addEventListener('click', chooseFeature);
            const featureName = elementItem.dataset.feature;
            if (featureName && features[featureName]) {
                elementItem.classList.add('active');
                const botElementIndex = Array.from(elementItems).indexOf(elementItem);
                const correspondingBotElement = botElements[botElementIndex];

                correspondingBotElement.classList.add('active');
            }
        });
    }
};
