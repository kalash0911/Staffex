export const initFooterInViewport = () => {
    const footer = document.querySelector('#footer');

    if (!footer) return;

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
    observer.observe(footer);
};
