import { initBurgerMenu } from './burder-menu';
import { initFullpageJs } from './fullpage';
import { initAnimationOnScroll } from './animation-scroll';
import { initTextAnimation } from './text-animation';
import { initParallax } from './mouse-move-parallax';
import { initSongBtn } from './song-btn';
import { initAboutSlider } from './about-slider';
import { initCounterAnimate } from './counter-animate';
import { initAudioClicks } from './audio';
import { initAutoPlayVideoOnScroll } from './autoplay-video';
import { initTabs } from './tabs';
import { initAccordions } from './accordions';
import { initFixedBtnsOnScroll } from './fixed-btns';
import './lottie-icons';

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
});

const elementItems = document.querySelectorAll('.element-item');
const botElements = document.querySelectorAll('.bot-element');

if (elementItems.length > 0 && botElements.length > 0) {
    function addActiveClass(event) {
        event.currentTarget.classList.toggle('active');

        const botElementIndex = Array.from(elementItems).indexOf(
            event.currentTarget,
        );
        const correspondingBotElement = botElements[botElementIndex];

        correspondingBotElement.classList.toggle('active');
    }

    elementItems.forEach((elementItem) => {
        elementItem.addEventListener('click', addActiveClass);
    });
}
