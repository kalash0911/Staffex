import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// TODO: fix styles and html:
// make btn static (remove tranform styles), remove ovh and height from general wrappers
// add ids to html | change html structure

export const initFixedBtnsOnScroll = () => {
  // TODO: do similar for all btns
  let secretaryST = ScrollTrigger.create({
    trigger: '#secretaryPinBtn', // Btn id
    pin: true,
    start: 'bottom bottom-=50px',
    end: 'top bottom',
    endTrigger: '#smm-manager', // Next section id
    markers: true,
    // onToggle: (self) => console.log('toggled, isActive:', self.isActive),
    // onUpdate: (self) => {
    //   console.log(
    //     'progress:',
    //     self.progress.toFixed(3),
    //     'direction:',
    //     self.direction,
    //     'velocity',
    //     self.getVelocity(),
    //   );
    // },
  });

  const updateValues = () => {
    // Section id
    if (ScrollTrigger.isInViewport(document.querySelector('#secretary'))) {
      secretaryST.refresh();
    }
  };

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: updateValues,
  });
};
