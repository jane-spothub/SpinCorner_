import './App.css'
import { MainGameArea } from "./Components/MainGameArea";
import { Loader } from "./Components/Loader";
import { useState } from "react";

// 🔊 all assets to preload
import spinLogo from "./assets/img/scene/Spin-Corner-center piece logo.png";
import spinBackground from "./assets/img/scene/Background2.webp";
import wheelBg from "./assets/img/SPINCORNERwheel.webp";
import pointer from "./assets/img/scene/pointer-spin2.png";
import RollSndSrc from "./SpinCornerAudio/AudioFiles/wheelrolling.wav";
import PopUpWin from "./SpinCornerAudio/AudioFiles/popupwin.wav";
import PopUpLose from "./SpinCornerAudio/AudioFiles/popuplose.wav";
import BetAmountSnd from "./SpinCornerAudio/AudioFiles/betAmountsnd.wav";
import playBetSnd from "./SpinCornerAudio/AudioFiles/betsnd.wav";

function App() {
    const [loaded, setLoaded] = useState(false);

    const assets = [
        spinLogo,
        wheelBg,
        RollSndSrc,
        PopUpWin,
        PopUpLose,
        BetAmountSnd,
        playBetSnd,
        pointer,
        spinBackground
        // add more images/sounds here
    ];

    return (
        <>
            {!loaded ? (
                <Loader assets={assets} onComplete={() => setLoaded(true)} />
            ) : (
                <MainGameArea />
            )}
        </>
    );
}

export default App;
