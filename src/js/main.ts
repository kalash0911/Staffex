/* For burger */

const burger = document.querySelector(".burger");
const menuBody = document.querySelector(".menu-wrap");
const linkClose = document.querySelectorAll(".link-close");
const overflow = document.querySelector(".overflow");

if (burger) {
    burger.addEventListener("click", function (e) {
        document.body.classList.toggle("body_lock");
        document.body.classList.toggle("active");
        if (burger.classList.contains('burger_active')) {
            burger.classList.add('burger_finish');
            burger.classList.remove('burger_active');
            overflow.classList.toggle("overflow_active");
        } else {
            burger.classList.add('burger_active');
            burger.classList.remove('burger_finish');
            overflow.classList.toggle("overflow_active");
        }
    });
};

if (overflow) {
    overflow.addEventListener("click", function (e) {
        document.body.classList.toggle("body_lock");
        document.body.classList.toggle("active");
        if (burger.classList.contains('burger_active')) {
            burger.classList.add('burger_finish');
            burger.classList.remove('burger_active');
            overflow.classList.toggle("overflow_active");
        } else {
            burger.classList.add('burger_active');
            burger.classList.remove('burger_finish');
            overflow.classList.toggle("overflow_active");
        }
    });
};

if (linkClose.length) {
    for (var i = 0; i < linkClose.length; ++i) {
        linkClose[i].addEventListener("click", function (e) {
            document.body.classList.remove("body_lock");
            document.body.classList.remove("active");
            burger.classList.remove("burger_active");
            burger.classList.add('burger_finish');
            menuBody.classList.remove("menu_active");
            overflow.classList.remove("overflow_active");
        })
    }
};


/* For Page full scroll */

var fullpageInstance;

function toggleFullPage() {
    var screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenSize <= 767) {
        if (fullpageInstance) {
            fullpageInstance.destroy('all');
            fullpageInstance = null;
        }
    } else {
        if (!fullpageInstance) {
            // @ts-ignore
            fullpageInstance = new fullpage("#fullpage", {
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
    entry.forEach(change => {
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


document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement, {
        style: `
		--move-x: ${(e.clientX - window.innerWidth / 2) * -.003}deg;
		--move-y: ${(e.clientY - window.innerHeight / 2) * .005}deg;
		`
    })
})

/* Song Btn */

document.addEventListener("DOMContentLoaded", function () {
    const songBtn: HTMLElement | null = document.querySelector('.song-btn');
    const audio: HTMLAudioElement | null = document.querySelector('.song-btn audio');

    if (songBtn && audio) {
        audio.play()
        audio.muted = false
        songBtn.addEventListener('click', function () {

            if (audio.muted === undefined) {
                audio.muted = true;
            } else {
                audio.muted = !audio.muted;
            }

            songBtn.classList.toggle('mute');
        });
    }
});


