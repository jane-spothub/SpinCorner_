import {useCallback, useMemo} from "react";
import RollSndSrc from "./AudioFiles/wheelrolling.wav";
import PopUpWin from "./AudioFiles/popupwin.wav";
import PopUpLose from "./AudioFiles/popuplose.wav";
import BetAmountSnd from "./AudioFiles/betAmountsnd.wav";
import playBetSnd from "./AudioFiles/betsnd.wav";
// import spinCBackgroundSound from "./SafariSlotSonds/background-music.mp3";

export const useSpinAudio = (isMuted: boolean) => {
    const SpinCornerAudioInstances = useMemo(() => {
        return {
            RollSnd: new Audio(RollSndSrc),
            popUpWin: new Audio(PopUpWin),
            popUpLose: new Audio(PopUpLose),
            BetAmountSnd: new Audio(BetAmountSnd),
            PlaySnd: new Audio(playBetSnd)
        };
    }, []);

    // const spinCornerBackgroundSound = useMemo(() => {
    //     const bgSound = new Audio(spinCBackgroundSound);
    //     bgSound.loop = loop;
    //     return bgSound;
    // }, [loop]);
    //
    // useEffect(() => {
    //     spinCornerBackgroundSound.volume = isMuted ? 0 : 1;
    //     spinCornerBackgroundSound.play().catch((err) => {
    //         if (err.name === "NotAllowedError") {
    //             console.warn("Waiting for user interaction to start background music.");
    //             const resume = () => {
    //                 spinCornerBackgroundSound.play().then(() => {
    //                     spinCornerBackgroundSound.volume = isMuted ? 0 : 0.5;
    //                 });
    //                 document.removeEventListener("click", resume);
    //                 document.removeEventListener("keydown", resume);
    //             };
    //             document.addEventListener("click", resume);
    //             document.addEventListener("keydown", resume);
    //         }
    //     });
    //
    //     return () => {
    //         spinCornerBackgroundSound.pause();
    //         spinCornerBackgroundSound.currentTime = 0;
    //     };
    // }, [spinCornerBackgroundSound, isMuted]);

    const playSpinWheelLoop = useCallback((spinDuration: number) => {
        if (isMuted) return;

        const shuffleSound = SpinCornerAudioInstances.RollSnd;
        shuffleSound.currentTime = 0;
        shuffleSound.play();

        // Loop sound every time it ends
        const interval = setInterval(() => {
            shuffleSound.currentTime = 0;
            shuffleSound.volume = 0.8;
            shuffleSound.play();
        }, shuffleSound.duration * 1000);

        // Stop the loop after spinDuration
        setTimeout(() => {
            clearInterval(interval);
            shuffleSound.pause();
            shuffleSound.currentTime = 0;
        }, spinDuration);
    }, [SpinCornerAudioInstances.RollSnd, isMuted]);


    const playSpinCornerSnd = useCallback(
        (soundKey: keyof typeof SpinCornerAudioInstances) => {
            if (isMuted) return;

            const sound = SpinCornerAudioInstances[soundKey];
            if (!sound.paused) {
                sound.pause();
                sound.currentTime = 0;
            }
            sound.play().catch((err) => {
                if (err.name === 'NotAllowedError') {
                    // console.warn('User interaction required for audio playback.');
                } else {
                    // console.error('Audio playback error:', err);
                }
            });
        },
        [SpinCornerAudioInstances, isMuted]
    );
    return {playSpinCornerSnd,playSpinWheelLoop};
};