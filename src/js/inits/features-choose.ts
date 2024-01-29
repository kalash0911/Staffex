import { SECRETARY_FEATURES_KEY } from '../react-form/constants/form';
import { BASIC_PRICE, FEATURE_PRICE } from '../react-form/constants/currency';

export const initFeatureChoose = () => {
    const elementItems = document.querySelectorAll('.element-item') as NodeListOf<HTMLDivElement>;
    const mainVideo = document.querySelector('.bot-video-el') as HTMLVideoElement;
    const botElements = document.querySelectorAll('.bot-element') as NodeListOf<HTMLVideoElement>;
    const priceEl = document.querySelector('.price') as HTMLDivElement;
    let price = BASIC_PRICE;
    priceEl.textContent = setPrice(price);

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
            if (!features[featureName]) {
                price -= FEATURE_PRICE;
            } else {
                price += FEATURE_PRICE;
            }
            priceEl!.textContent = setPrice(price);
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
                price += FEATURE_PRICE;
                elementItem.classList.add('active');
                const botElementIndex = Array.from(elementItems).indexOf(elementItem);
                const correspondingBotElement = botElements[botElementIndex];
                priceEl!.textContent = setPrice(price);

                correspondingBotElement.classList.add('active');
            }
        });
    }

    function setPrice(count: number) {
        return count
            .toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            })
            .replace('.00', '');
    }
};
