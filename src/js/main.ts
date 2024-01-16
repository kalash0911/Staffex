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
    initVideoCreate();
});

const initFooterInViewport = () => {
    let options = { threshold: [0.5] };
    let observer = new IntersectionObserver((entry) => {
        entry.forEach((el) => {
            if (el.isIntersecting) {
                document.body.classList.add('footer-active');
            } else {
                document.body.classList.remove('footer-active');
            }
        });
    }, options);
    observer.observe(document.querySelector('#footer'));
};

const initVideoCreate = () => {
    const videoWraps = document.querySelectorAll('.pre-bot-wrap');

    videoWraps.forEach((el) => {
        const video = document.createElement('video');
        video.classList.add('bg', 'bg-video', 'pre-bot-bg', 'anim');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('muted', 'true');
        video.setAttribute('loop', 'true');
        video.setAttribute('playsinline', 'true');
        video.setAttribute('data-keepplaying', 'true');
        video.setAttribute('src', './files/pre-bot-bg1.webm');
        console.log('video: ', video);
        el.appendChild(video);
    });
};
