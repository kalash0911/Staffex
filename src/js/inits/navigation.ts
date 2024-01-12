export const initNavigation = () => {
    const navMenu = document.querySelector('.menu');
    const links = navMenu.querySelectorAll('a.link');
    const isMainPage = document.querySelector('#main-page');

    if (!links) return;

    if (!isMainPage) {
        links.forEach((link) => {
            const anchor = link.getAttribute('href');
            link.setAttribute('href', `index.html${anchor}`);
        });
    }

    const toggleNav = () => {
        const screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (isMainPage && screenSize <= 1024) {
            links.forEach((link) => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const anchor = link.getAttribute('href').slice(1);
                    const section = document.querySelector(`[data-anchor="${anchor}"]`);
                    section.scrollIntoView();
                });
            });
            return;
        }
    };

    toggleNav();

    window.addEventListener('resize', function () {
        toggleNav();
    });
};
