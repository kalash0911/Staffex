export const initParallax = () => {
  const mousemoveSection = document.querySelector('.mousemove');

  if (mousemoveSection) {
    document.addEventListener('mousemove', (event) => {
      const sectionRect = mousemoveSection.getBoundingClientRect();

      if (
        event.clientX >= sectionRect.left &&
        event.clientX <= sectionRect.right &&
        event.clientY >= sectionRect.top &&
        event.clientY <= sectionRect.bottom
      ) {
        applyMouseMoveStyles(event);
      } else {
        removeMouseMoveStyles();
      }
    });

    mousemoveSection.addEventListener('mouseleave', () => {
      removeMouseMoveStyles();
    });
  }

  function applyMouseMoveStyles(event: MouseEvent) {
    Object.assign(document.documentElement, {
      style: `
            --move-x: ${(event.clientX - window.innerWidth / 2) * -0.003}deg;
            --move-y: ${(event.clientY - window.innerHeight / 2) * 0.005}deg;
        `,
    });
  }

  function removeMouseMoveStyles() {
    Object.assign(document.documentElement, {
      style: `
            --move-x: 0deg;
            --move-y: 0deg;
        `,
    });
  }
};
