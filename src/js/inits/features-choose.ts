import { SECRETARY_FEATURES_KEY } from '../react-form/constants/form';
import { BASIC_PRICE, FEATURE_PRICE } from '../react-form/constants/currency';

const initFeatureChoose = () => {
    const { popupNode: popup, img: popupImg, text: popupText, title: popupTitle, actionBtn: popupActionBtn } = initPopup();
    const localSaves = localStorage.getItem(SECRETARY_FEATURES_KEY);

    const features = localSaves
        ? JSON.parse(localSaves)
        : {
              communicationCoordination: false,
              voiceRecognation: false,
              documentPreparation: false,
              crm: false,
          };

    localStorage.setItem(SECRETARY_FEATURES_KEY, JSON.stringify(features));
    const featuresList = Object.keys(features);
    const priceEl = document.querySelector('.price') as HTMLDivElement | null;
    const elementItems = document.querySelectorAll('.element-item') as NodeListOf<HTMLDivElement>;
    const mainVideo = document.querySelector('.bot-video-el') as HTMLVideoElement;
    const botElements = document.querySelectorAll('.bot-element') as NodeListOf<HTMLVideoElement>;

    if (!priceEl) return;
    if (!elementItems.length) return;

    let price = BASIC_PRICE;
    calcInitialPrice();
    showActiveItems();
    syncVideos();

    elementItems.forEach((item) => {
        const featureName = item.dataset.feature || '';

        item.addEventListener('click', (event: any) => {
            const screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const isMobile = screenSize <= 479;

            if (!isMobile || event.target.classList.contains('plus-check') || event.target.closest('plus-check')) {
                toggleFeature(featureName);
            } else {
                openPopup(item);
            }
        });
    });

    function syncVideos() {
        botElements.forEach((video) => {
            video.currentTime = mainVideo.currentTime;
        });
    }

    function normalizePrice(count: number) {
        return count
            .toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            })
            .replace('.00', '');
    }

    function toggleFeature(featureName: string) {
        features[featureName] = !features[featureName];
        showActiveItems();
        calcPrice(featureName);
        localStorage.setItem(SECRETARY_FEATURES_KEY, JSON.stringify(features));
    }

    function showActiveItems() {
        featuresList.forEach((featureName) => {
            const featureElements = document.querySelectorAll(`[data-feature="${featureName}"]`);
            featureElements.forEach((element) => {
                if (features[featureName]) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        });
    }

    function calcInitialPrice() {
        featuresList.forEach((feature) => {
            if (features[feature]) {
                price += FEATURE_PRICE;
            }
        });
        priceEl!.textContent = normalizePrice(price);
    }

    function calcPrice(featureName: string) {
        if (!features[featureName]) {
            price -= FEATURE_PRICE;
        } else {
            price += FEATURE_PRICE;
        }
        priceEl!.textContent = normalizePrice(price);
    }

    function initPopup() {
        const popupWrap = document.querySelector('.pop-up') as HTMLDivElement;
        const closeBtns = popupWrap.querySelectorAll('.closePopup');
        const imgWrap = popupWrap.querySelector('.img-wrap');
        const titleWrap = popupWrap.querySelector('.title-wrap');
        const textWrap = popupWrap.querySelector('.text-wrap');
        const actionBtn = popupWrap.querySelector('.actionBtn') as HTMLButtonElement;

        closeBtns.forEach((btn) => btn.addEventListener('click', () => closePopup()));

        actionBtn?.addEventListener('click', () => {
            const featureName = actionBtn.dataset.feature || '';
            toggleFeature(featureName);
            closePopup();
        });

        return { popupNode: popupWrap, img: imgWrap, title: titleWrap, text: textWrap, actionBtn };
    }

    function openPopup(elementItem: HTMLDivElement) {
        const featureName = elementItem.dataset.feature || '';

        const img = elementItem.querySelector('img')!.cloneNode(true);
        const title = elementItem.querySelector('.item-title')!.cloneNode(true);
        const text = elementItem.querySelector('.item-text')!.cloneNode(true);

        popupActionBtn.setAttribute('data-feature', featureName);

        if (features[featureName]) {
            popupActionBtn.querySelector('.btn-text')!.textContent = 'Remove item';
        } else {
            popupActionBtn.querySelector('.btn-text')!.textContent = 'Add item';
        }

        popupImg!.innerHTML = '';
        popupTitle!.innerHTML = '';
        popupText!.innerHTML = '';

        popupImg?.appendChild(img);
        popupTitle?.appendChild(title);
        popupText?.appendChild(text);

        popup.classList.add('active');
    }

    function closePopup() {
        popup.classList.remove('active');
    }
};

export { initFeatureChoose };
