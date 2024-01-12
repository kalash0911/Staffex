import { initBurgerMenu } from './inits/burder-menu';
import { initFullpageJs } from './inits/fullpage';
import { initAnimationOnScroll } from './inits/animation-scroll';
import { initTextAnimation } from './inits/text-animation';
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
import { initFeatureChoose } from './inits/features-choose';
import { pinButtonsOnScroll } from './inits/pin-btns';
import { initNavigation } from './inits/navigation';

document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initFullpageJs();
    initAnimationOnScroll();
    initTextAnimation();
    initAboutSlider();
    initCounterAnimate();
    initTabs();
    initAccordions();
    // initFixedBtnsOnScroll();
    // animationElementsOnScroll();
    pinButtonsOnScroll();
    initNavigation();
    initFooterInViewport();
});

window.addEventListener('load', () => {
    initFeatureChoose();
    initLottiesAnimations();
    initVideoChanges();
    initSongBtn();
    initAudioClicks();
    initAutoPlayVideoOnScroll();
});

const initFooterInViewport = () => {
    let options = { threshold: [0.5] };
    let observer = new IntersectionObserver((entry) => {
        entry.forEach((el) => {
            if (el.isIntersecting) {
                el.target.classList.add('footer-active');
            } else {
                el.target.classList.remove('footer-active');
            }
        });
    }, options);
    observer.observe(document.querySelector('#footer'));
};
