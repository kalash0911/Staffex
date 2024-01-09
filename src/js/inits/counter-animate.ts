export const initCounterAnimate = () => {
  if (document.querySelectorAll('.count-progress').length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.getAttribute('data-animated') === 'false'
        ) {
          const element = entry.target;
          // @ts-ignore
          const count = parseFloat(element.innerText);
          const isInteger = count % 1 === 0; // Check if the number is an integer

          let currentCount = 0;
          const speed =
            parseInt(element.getAttribute('data-speed') || '') || 10;
          const step =
            parseFloat(element.getAttribute('data-step') || '') || 0.1;
          const decimalPlaces = isInteger ? 0 : 1; // Set the number of decimal places based on whether it's an integer or not

          const numberFormatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          });

          const interval = setInterval(() => {
            if (currentCount < count) {
              currentCount += step;
              if (currentCount > count) {
                currentCount = count;
              }
              // @ts-ignore
              element.innerText = numberFormatter.format(currentCount);
            } else {
              clearInterval(interval);
              element.setAttribute('data-animated', 'true');
            }
          }, speed);
        }
      });
    });

    document.querySelectorAll('.count-progress').forEach((element) => {
      observer.observe(element);
    });
  }
};
