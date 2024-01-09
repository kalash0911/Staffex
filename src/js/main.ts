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

// Получаем все элементы с классом "element-item" и "bot-element"
const elementItems = document.querySelectorAll('.element-item');
const botElements = document.querySelectorAll('.bot-element');

// Проверка на наличие элементов
if (elementItems.length > 0 && botElements.length > 0) {
    function addActiveClass(event) {
        // Добавляем класс "active" для элемента, по которому было совершено событие
        event.currentTarget.classList.toggle('active');

        // Находим соответствующий элемент с классом "bot-element"
        const botElementIndex = Array.from(elementItems).indexOf(
            event.currentTarget,
        );
        const correspondingBotElement = botElements[botElementIndex];

        // Добавляем класс "active" для соответствующего "bot-element"
        correspondingBotElement.classList.toggle('active');
    }

    // Добавляем обработчик события для каждого элемента с классом "element-item"
    elementItems.forEach((elementItem) => {
        elementItem.addEventListener('click', addActiveClass);
    });
}
