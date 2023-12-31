import { initBurgerMenu } from './inits/burder-menu';
import { initFullpageJs } from './inits/fullpage';
import { initAnimationOnScroll } from './inits/animation-scroll';
import { initTextAnimation } from './inits/text-animation';
import { initParallax } from './inits/mouse-move-parallax';
import { initSongBtn } from './inits/song-btn';
import { initAboutSlider } from './inits/about-slider';
import { initCounterAnimate } from './inits/counter-animate';
import { initAudioClicks } from './inits/audio';
import { initAutoPlayVideoOnScroll } from './inits/autoplay-video';
import { initTabs } from './inits/tabs';
import { initAccordions } from './inits/accordions';
import { initFixedBtnsOnScroll } from './inits/fixed-btns';
import { initVideoChanges } from './inits/videos-changer';
import { initLottiesAnimations } from './inits/lottie-icons';

document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initFullpageJs();
    initAnimationOnScroll();
    initTextAnimation();
    initParallax();
    initSongBtn();
    initAboutSlider();
    initCounterAnimate();
    initAudioClicks();
    initAutoPlayVideoOnScroll();
    initTabs();
    initAccordions();
    initFixedBtnsOnScroll();
    initVideoChanges();
    initLottiesAnimations();
});

const elementItems = document.querySelectorAll('.element-item');
const botElements = document.querySelectorAll('.bot-element');

if (elementItems.length > 0 && botElements.length > 0) {
    function addActiveClass(event) {
        event.currentTarget.classList.toggle('active');

        const botElementIndex = Array.from(elementItems).indexOf(event.currentTarget);
        const correspondingBotElement = botElements[botElementIndex];

        correspondingBotElement.classList.toggle('active');
    }

    elementItems.forEach((elementItem) => {
        elementItem.addEventListener('click', addActiveClass);
    });
}
