import { supportsHEVCAlpha } from '../utils/general';

export const initVideoChanges = () => {
    const playerSpeak = document.querySelectorAll('.speak-video') as NodeListOf<HTMLVideoElement>;

    if (playerSpeak.length) {
        playerSpeak?.forEach((video, ind) => {
            video.src = supportsHEVCAlpha() ? `./files/speak${ind + 1}.mov` : `./files/speak${ind + 1}.webm`;
        });
    }

    const playerBotsEl = document.querySelectorAll('.bvel1') as NodeListOf<HTMLVideoElement>;

    if (playerBotsEl.length) {
        playerBotsEl.forEach((video, ind) => {
            video.src = supportsHEVCAlpha()
                ? `./files/secretary/secretary${ind + 1}.mov`
                : `./files/secretary/secretary${ind + 1}.webm`;
        });
    }

    const playerBotsEl2 = document.querySelectorAll('.bvel2') as NodeListOf<HTMLVideoElement>;

    if (playerBotsEl2.length) {
        playerBotsEl2.forEach((video, ind) => {
            video.src = supportsHEVCAlpha() ? `./files/manager/manager${ind + 1}.mov` : `./files/manager/manager${ind + 1}.webm`;
        });
    }
};
