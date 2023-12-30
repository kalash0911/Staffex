/* For burger */

const burger = document.querySelector('.burger');
const menuBody = document.querySelector('.menu-wrap');
const linkClose = document.querySelectorAll('.link-close');
const overflow = document.querySelector('.overflow');

if (burger) {
    burger.addEventListener('click', function (e) {
        document.body.classList.toggle('body_lock');
        document.body.classList.toggle('active');
        if (burger.classList.contains('burger_active')) {
            burger.classList.add('burger_finish');
            burger.classList.remove('burger_active');
            overflow.classList.toggle('overflow_active');
        } else {
            burger.classList.add('burger_active');
            burger.classList.remove('burger_finish');
            overflow.classList.toggle('overflow_active');
        }
    });
}

if (overflow) {
    overflow.addEventListener('click', function (e) {
        document.body.classList.toggle('body_lock');
        document.body.classList.toggle('active');
        if (burger.classList.contains('burger_active')) {
            burger.classList.add('burger_finish');
            burger.classList.remove('burger_active');
            overflow.classList.toggle('overflow_active');
        } else {
            burger.classList.add('burger_active');
            burger.classList.remove('burger_finish');
            overflow.classList.toggle('overflow_active');
        }
    });
}

if (linkClose.length) {
    for (var i = 0; i < linkClose.length; ++i) {
        linkClose[i].addEventListener('click', function (e) {
            document.body.classList.remove('body_lock');
            document.body.classList.remove('active');
            burger.classList.remove('burger_active');
            burger.classList.add('burger_finish');
            menuBody.classList.remove('menu_active');
            overflow.classList.remove('overflow_active');
        });
    }
}

/* For Page full scroll */

var fullpageInstance;

function toggleFullPage() {
    var screenSize =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    if (screenSize <= 767) {
        if (fullpageInstance) {
            fullpageInstance.destroy('all');
            fullpageInstance = null;
        }
    } else {
        if (!fullpageInstance) {
            // @ts-ignore
            fullpageInstance = new fullpage('#fullpage', {
                scrollingSpeed: 1000,
            });
        }
    }
}

toggleFullPage();

window.addEventListener('resize', function () {
    toggleFullPage();
});

function onEntry(entry) {
    entry.forEach((change) => {
        if (change.isIntersecting) {
            change.target.classList.add('show');
        }
    });
}

/* Scroll anim */

let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.anim');
for (let elm of elements) {
    observer.observe(elm);
}

/* Text effect */

document.addEventListener('DOMContentLoaded', function () {
    const shuffleElements = document.querySelectorAll('.shuffle');
    const speed = 50;

    function updateText(element, originalText, iteration) {
        let shuffledText = '';
        const textLength = originalText.length;

        for (let i = 0; i < textLength; i++) {
            const randomIndex = Math.floor(Math.random() * textLength);
            shuffledText += originalText.charAt(randomIndex);
        }

        element.textContent = shuffledText;

        if (shuffledText !== originalText && iteration < 20) {
            setTimeout(() => updateText(element, originalText, iteration + 1), speed);
        } else {
            setTimeout(() => {
                element.textContent = originalText;
            }, speed);
        }
    }

    function handleShowClass(element) {
        const originalText = element.textContent;

        if (element.classList.contains('show')) {
            updateText(element, originalText, 0);
        }
    }

    shuffleElements.forEach(function (shuffleElement) {
        handleShowClass(shuffleElement);

        const observer = new MutationObserver(() => {
            handleShowClass(shuffleElement);
        });

        observer.observe(shuffleElement, { attributes: true });
    });
});

/* Mouse move effect */

document.addEventListener('mousemove', (e) => {
    Object.assign(document.documentElement, {
        style: `
		--move-x: ${(e.clientX - window.innerWidth / 2) * -0.003}deg;
		--move-y: ${(e.clientY - window.innerHeight / 2) * 0.005}deg;
		`,
    });
});

/* Song Btn */
document.addEventListener('DOMContentLoaded', function () {
    const songBtn: HTMLElement | null = document.querySelector('.song-btn');
    const audio: HTMLAudioElement | null =
        document.querySelector('.song-btn audio');

    if (songBtn && audio) {
        audio.style.display = 'none';
        let hasPlayed = false;

        songBtn.addEventListener('click', function () {
            if (!audio.paused) {
                audio.pause();
            } else {
                audio.play();
            }

            songBtn.classList.toggle('mute');
        });

        // Check autoplay or first manual play
        const handleFirstPlay = (event) => {
            if (!hasPlayed) {
                hasPlayed = true;
                audio.setAttribute('muted', 'false');
                audio.muted = false;
                songBtn.classList.remove('mute');
                event.target.removeEventListener('play', handleFirstPlay);
            }
        };

        audio.addEventListener('play', handleFirstPlay, false);

        // Check if user interact with page and play audio
        let playAttempt = setInterval(() => {
            if (!hasPlayed) {
                audio
                    .play()
                    .then(() => {
                        clearInterval(playAttempt);
                    })
                    .catch(() => {
                        console.log(
                            'Unable to play the audio, User has not interacted yet.',
                        );
                        songBtn.classList.add('mute');
                    });
            }
        }, 1000);
    }
});

/* For about-slider */

window.addEventListener('load', function () {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

function checkScreenSize() {
    var screenWidth = window.innerWidth;
    var threshold = 768;

    // @ts-ignore
    var mySwiper = new Swiper('.about-slider', {
        grabCursor: true,
        speed: 2000,

        autoplay: {
            delay: 2,
        },

        breakpoints: {

            320: {
                slidesPerView: 2,
                spaceBetween: 40,
            },

            850: {
                slidesPerView: 2,
                spaceBetween: 80,
            },

            900: {
                slidesPerView: 2,
                spaceBetween: 130,
            },

            1050: {
                slidesPerView: 2,
                spaceBetween: 300,
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 80,
            },

            1400: {
                slidesPerView: 3,
                spaceBetween: 140,
            },
        },

        on: {
            init() {
                this.autoplay.stop();

                this.el.addEventListener("mouseenter", () => {
                    this.autoplay.start();
                });

                this.el.addEventListener("mouseleave", () => {
                    this.autoplay.stop();
                });
            },
        },
    });

    if (screenWidth < threshold) {
        mySwiper.destroy();
    } else {
        mySwiper.init();
    }
}

/* For counter animate */
if (document.querySelectorAll(".count-progress").length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (
                entry.isIntersecting &&
                entry.target.getAttribute("data-animated") === "false"
            ) {
                const element = entry.target;
                // @ts-ignore
                const count = parseFloat(element.innerText);
                const isInteger = count % 1 === 0; // Check if the number is an integer

                let currentCount = 0;
                const speed = parseInt(element.getAttribute("data-speed")) || 10;
                const step = parseFloat(element.getAttribute("data-step")) || 0.1;
                const decimalPlaces = isInteger ? 0 : 1; // Set the number of decimal places based on whether it's an integer or not

                const numberFormatter = new Intl.NumberFormat("en-US", {
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
                        element.setAttribute("data-animated", "true");
                    }
                }, speed);
            }
        });
    });

    document.querySelectorAll(".count-progress").forEach((element) => {
        observer.observe(element);
    });
}


