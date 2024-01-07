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
  // initFixedBtnsOnScroll();
});
