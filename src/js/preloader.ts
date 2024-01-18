const loadWrap = document.querySelector('.load-wrapper');
const percentageEl = loadWrap.querySelector('#loading-percentage');
const progressBar = loadWrap.querySelector('.load-wrapper .progress-value') as HTMLDivElement;
progressBar.style.width = `${0}%`;
percentageEl.innerHTML = 0 + '%';
let percantageCounter = 35;

function getLoadingPercentage() {
    const state = document.readyState;
    let percentage = 0;
    switch (state) {
        case 'loading':
            percentage = 45;
            break;
        case 'interactive':
            percentage = 75;
            break;
        case 'complete':
            percentage = 100;
            break;
        default:
            percentage = 0;
    }
    return percentage;
}

function updateLoaderText() {
    const percentage = getLoadingPercentage();
    let loaderUIintervalID;
    percantageCounter++;

    if (percentage < 100) {
        if (percantageCounter < percentage) {
            progressBar.style.width = `${percantageCounter}%`;
            percentageEl.innerHTML = percantageCounter + '%';
        }
    } else {
        progressBar.style.width = `${percentage}%`;
        percentageEl.innerHTML = '100%';
        clearInterval(loaderUIintervalID);
        clearInterval(intervalID);
    }
}

const intervalID = setInterval(updateLoaderText, 250);

const hidePreloader = () => {
    setTimeout(() => {
        document.querySelector('body').classList.add('loaded');
        setTimeout(() => {
            loadWrap.classList.add('d-none');
        }, 350);
    }, 1300);
};

window.addEventListener('load', () => {
    hidePreloader();
});
