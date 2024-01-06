export const initAnimationOnScroll = () => {
  const onEntry: IntersectionObserverCallback = (entry) => {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.classList.add('show');
      }
    });
  };

  /* Scroll anim */

  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.anim');
  for (let elm of elements) {
    observer.observe(elm);
  }
};
