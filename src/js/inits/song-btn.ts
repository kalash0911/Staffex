export const initSongBtn = () => {
    const songBtn: HTMLElement | null = document.querySelector('.song-btn');
    const audio: HTMLAudioElement | null = document.querySelector('.song-btn audio');
    audio.volume = 0.1;

    if (songBtn && audio) {
        audio.style.display = 'none';
        let hasPlayed = false;
        songBtn.classList.add('mute');

        songBtn.addEventListener('click', function () {
            if (!audio.paused) {
                audio.pause();
            } else {
                audio.play();
            }

            songBtn.classList.toggle('mute');
        });

        // Check autoplay or first manual play
        const handleFirstPlay = (event: Event) => {
            if (!hasPlayed) {
                hasPlayed = true;
                audio.setAttribute('muted', 'false');
                audio.muted = false;
                songBtn.classList.remove('mute');
                event.target?.removeEventListener('play', handleFirstPlay);
            }
        };

        audio.addEventListener('play', handleFirstPlay, false);

        // Check if user interact with page and play audio
        // let playAttempt = setInterval(() => {
        //     if (!hasPlayed) {
        //         audio
        //             .play()
        //             .then(() => {
        //                 clearInterval(playAttempt);
        //             })
        //             .catch(() => {
        //                 console.log('Unable to play the audio, User has not interacted yet.');
        //                 songBtn.classList.add('mute');
        //             });
        //     }
        // }, 1000);
    }
};
