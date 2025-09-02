import {Canvas} from "./Canvas";
import {useEffect, useState} from "react";
import "../assets/maincss.css"
import {SpinControls} from "./SpinControls.tsx";
import type {ColorBlock} from "../Utils/types.ts";
import {HowToPlaySpin} from "./HowToPlaySpin.tsx";
import SettingsImg from "../assets/img/controls/settings-spin-corner.png"
import SettingsCloseImg from "../assets/img/controls/close-spin.png"
// import HowToPlayCloseImg from "../assets/img/controls/exit-or-close.png"
// import SounOnImg from "../assets/img/controls/sound-on.png"
// import SounOffImg from "../assets/img/controls/sound-off.png"
// import HowToPlayImg from "../assets/img/controls/how-to-play-btn.png"

export const MainGameArea = () => {
    const [spinState, setSpinState] = useState<boolean>(false);
    const [winner, setWinner] = useState<ColorBlock | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number>(99);
    const [balance, setBalance] = useState<number>(1000);
    const [freeSpinCount, setFreeSpinCount] = useState<number>(0);
    const [isPopUp, setIsPopUp] = useState<boolean>(false)
    const [isSettingsToggle, setIsSettingsToggle] = useState<boolean>(false)

    const handleSpin = () => {
        if (spinState) return;
        setSpinState(true);
        setBalance((prev) => prev - selectedLevel);
    };

// Spin end handler
    useEffect(() => {
        if (spinState) {
            const timer = setTimeout(() => {
                setSpinState(false);
            }, 2500); // spin duration
            return () => clearTimeout(timer);
        }
    }, [spinState]);

    useEffect(() => {
        if (winner) {
            setIsPopUp(true);

            let freeSpinsToAdd = 0;

            // Handle amounts
            if (!isNaN(Number(winner.amount))) {
                // Numeric prize like "50", "1000", etc.
                const winAmount = Number(winner.amount)
                setBalance(prev => prev + winAmount);
            } else {
                switch (winner.amount) {
                    case "Zako 2":
                        freeSpinsToAdd = 2;
                        break;
                    case "Zako 3":
                        freeSpinsToAdd = 3;
                        break;
                    case "SPIN TENA":
                        freeSpinsToAdd = 1;
                        break;
                    case "Gonga 3K":
                        setBalance(prev => prev + 3000);
                        break;
                    case "Gonga 10K":
                        setBalance(prev => prev + 10000);
                        break;
                    case "Gonga 25K":
                        setBalance(prev => prev + 25000);
                        break;
                    case "Nunge Tosha":
                        // Do nothing (loss)
                        break;
                    default:
                        break;
                }
            }

            if (freeSpinsToAdd > 0) {
                setFreeSpinCount(prev => prev + freeSpinsToAdd);
            }

            const timer = setTimeout(() => {
                setIsPopUp(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [winner]);

// Consume free spins when spin ends
    useEffect(() => {
        if (!spinState && freeSpinCount > 0) {
            const timer = setTimeout(() => {
                setFreeSpinCount(prev => prev - 1);
                setSpinState(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [spinState, freeSpinCount]);

// Award free spins (only once per spin)
//     useEffect(() => {
//         if (!spinState && winner) {
//             if (!isFreeSpin) {
//                 let freeSpinsToAdd = 0;
//
//                 switch (winner.amount) {
//                     case "SPIN TENA":
//                         freeSpinsToAdd = 1;
//                         break;
//                     case "Zako 2":
//                         freeSpinsToAdd = 2;
//                         break;
//                     case "Zako 3":
//                         freeSpinsToAdd = 3;
//                         break;
//                 }
//
//                 if (freeSpinsToAdd > 0) {
//                     setFreeSpinCount(prev => prev + freeSpinsToAdd);
//                 }
//             }
//
//             // ✅ reset free-spin flag ONLY after we’ve handled everything
//             setIsFreeSpin(false);
//         }
//     }, [isFreeSpin, spinState, winner]);

    return (
        <div className="Spin-main-container">
            <div className="spin-game-area">
                <div className="main-game-area">
                    <div className="spin-corner-top-bar">
                        {isSettingsToggle ? (
                            <img className="spin-corner-icons"
                                 src={SettingsCloseImg}
                                 onClick={() => setIsSettingsToggle(false)}
                                 alt="settings"
                            />
                        ) : (

                            <img className="spin-corner-icons"
                                 src={SettingsImg}
                                 onClick={() => setIsSettingsToggle(true)}
                                 alt="settings"
                            />


                        )}


                        <div className="spin-corner-logo">Spin Corner</div>
                        <div className="spin-balance-container">
                            Bal:
                            <div className="spin-corner-balance">
                                {balance}
                            </div>
                        </div>
                    </div>

                    <Canvas
                        spinState={spinState}
                        level={selectedLevel}
                        OnSetWinner={setWinner}
                        freeSpinCount={freeSpinCount}
                    />

                    <SpinControls
                        freeSpinCount={freeSpinCount}

                        handleSpin={handleSpin}
                        spinState={spinState}
                        OnSetSelectedLevel={setSelectedLevel}
                        level={selectedLevel}
                    />
                </div>

            </div>

            {/* Popup */}
            {isPopUp && (
                <div className="popup">
                    {winner && (
                        <div className="pop-container">
                            {winner.amount === "Nunge Tosha" ? (
                                <div className="three-d-text-lost">You Lost!</div>

                            ) : (
                                <div className="three-d-text-win">You Won!</div>
                            )}

                            {winner.amount === "SPIN TENA" && (
                                <div className="amount-won"> 1 free spin! </div>
                            )}
                            {winner.amount === "Zako 2" && (
                                <div className="amount-won"> 2 free spins! </div>
                            )}
                            {winner.amount === "Zako 3" && (
                                <div className="amount-won"> 3 free spins! </div>
                            )}
                            {winner.amount !== "SPIN TENA" &&
                                winner.amount !== "Zako 2" &&
                                winner.amount !== "Nunge Tosha" &&
                                winner.amount !== "Zako 3" &&
                                winner.amount !== "Gonga 3K" &&
                                winner.amount !== "Gonga 10K" &&
                                winner.amount !== "Gonga 25K" &&
                                (
                                    <div className="amount-won"> {winner.amount}kes</div>
                                )}
                            {winner.amount === "Nunge Tosha" && (
                                <div className="amount-won">try again !! </div>
                            )}
                            {winner.amount === "Gonga 3K" && (
                                <div className="amount-won"> 3,000kes</div>
                            )}
                            {winner.amount === "Gonga 10K" && (
                                <div className="amount-won"> 10,000kes</div>
                            )}
                            {winner.amount === "Gonga 25K" && (
                                <div className="amount-won"> 25,000kes</div>
                            )}

                        </div>
                    )}
                </div>
            )}
            <HowToPlaySpin/>

        </div>
    );
};
