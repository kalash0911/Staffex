import { initBurgerMenu } from './inits/burder-menu';
import { initFullpageJs } from './inits/fullpage';
import { initAnimationOnScroll } from './inits/animation-scroll';
import { initSongBtn } from './inits/song-btn';
import { initAboutSlider } from './inits/about-slider';
import { initCounterAnimate } from './inits/counter-animate';
import { initAudioClicks } from './inits/audio';
import { initAutoPlayVideoOnScroll } from './inits/autoplay-video';
import { initTabs } from './inits/tabs';
import { initAccordions } from './inits/accordions';
import { initVideoChanges } from './inits/videos-changer';
import { initLottiesAnimations } from './inits/lottie-icons';
import { initFeatureChoose } from './inits/features-choose';
/* import { pinButtonsOnScroll } from './inits/pin-btns'; */
import { initNavigation } from './inits/navigation';
import { initFooterInViewport } from './inits/footer-viewport';
import { initBotsVideoloops } from './inits/bots-video-loops';

document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu();
    initFullpageJs();
    initAnimationOnScroll();
    initAboutSlider();
    initCounterAnimate();
    initTabs();
    initAccordions();
    /*     pinButtonsOnScroll(); */
    initNavigation();
    initFooterInViewport();
    initBotsVideoloops();
});

window.addEventListener('load', () => {
    initFeatureChoose();
    initLottiesAnimations();
    initVideoChanges();
    initSongBtn();
    initAudioClicks();
    initAutoPlayVideoOnScroll();
});
