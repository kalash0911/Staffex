export const initTextAnimation = () => {
  const shuffleElements = document.querySelectorAll('.shuffle');

  if (shuffleElements.length > 0) {
    const speed = 50;

    function updateText(
      element: Element,
      originalText: string | null,
      iteration: number,
    ) {
      let shuffledText = '';
      const textLength = originalText?.length || 0;

      for (let i = 0; i < textLength; i++) {
        const randomIndex = Math.floor(Math.random() * textLength);
        shuffledText += originalText?.charAt(randomIndex);
      }

      element.textContent = shuffledText;

      if (shuffledText !== originalText && iteration < 20) {
        setTimeout(
          () => updateText(element, originalText, iteration + 1),
          speed,
        );
      } else {
        setTimeout(() => {
          element.textContent = originalText;
        }, speed);
      }
    }

    function handleShowClass(element: Element) {
      const originalText = element.textContent;

      if (
        element.classList.contains('show') &&
        !element.classList.contains('shuffled')
      ) {
        element.classList.add('shuffled');
        updateText(element, originalText, 0);
      }
    }

    shuffleElements.forEach((shuffleElement) => {
      handleShowClass(shuffleElement);

      const observer = new MutationObserver(() => {
        handleShowClass(shuffleElement);
      });

      observer.observe(shuffleElement, { attributes: true });
    });
  }
};
