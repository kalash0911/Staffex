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
import { initFeatureChoose } from './inits/features-choose';

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
    initFeatureChoose();
});

document.addEventListener('readystatechange', (event) => {
    console.log(' document.readyState: ', document.readyState);
    if (document.readyState === 'loading') {
        console.log('content is loading');
    } else if (document.readyState === 'interactive') {
        console.log('dom content loaded but resources like image or script has not been loaded yet.');
    } else {
        console.log('loading complete.');
    }
});
