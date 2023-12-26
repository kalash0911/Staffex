new fullpage("#fullpage", {
    scrollingSpeed: 1000,
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

        // Проверка, завершена ли анимация
        if (shuffledText !== originalText && iteration < 20) {
            setTimeout(() => updateText(element, originalText, iteration + 1), speed);
        } else {
            // Возвращаем исходный текст после завершения анимации
            setTimeout(() => {
                element.textContent = originalText;
            }, speed);
        }
    }

    // Обработчик события для запуска анимации при добавлении класса "show"
    function handleShowClass(element) {
        const originalText = element.textContent;

        // Проверка, есть ли у элемента класс "show" перед началом анимации
        if (element.classList.contains('show')) {
            updateText(element, originalText, 0);
        }
    }

    // Запуск анимации для каждого элемента с классом "shuffle"
    shuffleElements.forEach(function (shuffleElement) {
        handleShowClass(shuffleElement);

        // Наблюдатель за изменениями в атрибутах класса
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


