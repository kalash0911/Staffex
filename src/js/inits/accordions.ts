export const initAccordions = () => {
  let accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach((header) => {
    header.addEventListener('click', function () {
      // @ts-ignore
      toggleAccordion(this);
    });
  });

  let firstAccordion = document.querySelector('.accordion-item');
  if (firstAccordion) {
    firstAccordion.classList.add('active');
    let firstContent = firstAccordion.querySelector('.accordion-content');
    // @ts-ignore
    firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }

  function toggleAccordion(header: Element) {
    let item = header.parentElement;

    if (item && item.classList.contains('accordion-item')) {
      let isOpen = item.classList.toggle('active');
      let content: HTMLDivElement | null =
        item.querySelector('.accordion-content');

      if (!content) return;

      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        // @ts-ignore
        content.style.maxHeight = null;
      }

      closeOtherAccordions(item);
    }
  }

  function closeOtherAccordions(currentItem: HTMLElement) {
    let allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove('active');
        let content = item.querySelector('.accordion-content');
        // @ts-ignore
        content.style.maxHeight = null;
      }
    });
  }
};
