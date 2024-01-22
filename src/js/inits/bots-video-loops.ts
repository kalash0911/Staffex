export const initBotsVideoloops = () => {
    const bgVideoWraps = document.querySelectorAll('.bg-wrap');

    if (!bgVideoWraps.length) return;

    let options = { threshold: [0] };
    let observer = new IntersectionObserver((entry) => {
        entry.forEach((el) => {
            if (el.isIntersecting && !el.target.classList.contains('viewed')) {
                const firstVideo = el.target.querySelector('.bot-v1') as HTMLVideoElement;
                const secondVideo = el.target.querySelector('.bot-v2') as HTMLVideoElement;

                secondVideo.style.display = 'none';
                firstVideo.currentTime = 0;
                firstVideo.style.opacity = '1';

                firstVideo.addEventListener('ended', () => {
                    secondVideo.currentTime = 0;
                    secondVideo.style.display = 'block';
                    secondVideo.style.opacity = '1';
                });
                el.target.classList.add('viewed');
            }
        });
    }, options);

    bgVideoWraps.forEach((wrap) => {
        observer.observe(wrap);

        const firstVideo = wrap.querySelector('.bot-v1') as HTMLVideoElement;
        const secondVideo = wrap.querySelector('.bot-v2') as HTMLVideoElement;

        firstVideo.style.opacity = '0';
        secondVideo.style.opacity = '0';
    });
};
