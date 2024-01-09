export interface ScrollHandler {
  (event: Event): void;
}

export const initAutoPlayVideoOnScroll = () => {
  function isElementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll(): void {
    const videoElement = document.querySelector(
      '.video-play',
    ) as HTMLVideoElement;

    if (videoElement && isElementInViewport(videoElement)) {
      if (videoElement.paused) {
        videoElement
          .play()
          .then(() => {
            setTimeout(() => {
              videoElement.pause();
            }, videoElement.duration * 1000);
          })
          .catch((error) => {
            console.error('Error', error);
          });
      }
      window.removeEventListener('scroll', scrollHandler);
    }
  }

  const scrollHandler: ScrollHandler = handleScroll;
  window.addEventListener('scroll', scrollHandler);
};
