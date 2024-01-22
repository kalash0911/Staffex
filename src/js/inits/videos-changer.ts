import { supportsHEVCAlpha } from '../utils/general';

export const initVideoChanges = () => {
    const playerSpeak = document.querySelectorAll('.speak-video') as NodeListOf<HTMLVideoElement>;

    if (playerSpeak.length) {
        playerSpeak?.forEach((video, ind) => {
            video.src = supportsHEVCAlpha() ? `./files/speak${ind + 1}.mov` : `./files/speak${ind + 1}.webm`;
        });
    }

    const playerBotsEl = document.querySelectorAll('.bot-video-el') as NodeListOf<HTMLVideoElement>;

    if (playerBotsEl.length) {
        playerBotsEl.forEach((video, ind) => {
            video.src = supportsHEVCAlpha()
                ? `./files/secretary/secretary${ind + 1}.mov`
                : `./files/secretary/secretary${ind + 1}.webm`;
        });
    }

    const playerHeroBots = document.querySelectorAll('.hero-bot') as NodeListOf<HTMLVideoElement>;

    if (playerHeroBots.length) {
        playerHeroBots.forEach((video, ind) => {
            video.src = supportsHEVCAlpha() ? `./files/hero-bot${ind + 1}.mov` : `./files/hero-bot${ind + 1}.webm`;
        });
    }
};
