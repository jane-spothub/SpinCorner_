import {Canvas} from "./Canvas";
import {useEffect, useState} from "react";
import "../assets/maincss.css"
import {SpinControls} from "./SpinControls.tsx";
import type {ColorBlock} from "../Utils/types.ts";
import {HowToPlaySpin} from "./HowToPlaySpin.tsx";
import spinLogo from "../assets/img/scene/spin-corner-logo-1.png"
import {GameSettings} from "./GameSettings.tsx";

export const MainGameArea = () => {
    const [spinState, setSpinState] = useState<boolean>(false);
    const [winner, setWinner] = useState<ColorBlock | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number>(99);
    const [balance, setBalance] = useState<number>(1000);
    const [freeSpinCount, setFreeSpinCount] = useState<number>(0);
    const [isPopUp, setIsPopUp] = useState<boolean>(false);
    const [isSettingsToggle, setIsSettingsToggle] = useState<boolean>(false);

    const handleSpin = () => {
        if (spinState) return;

        // Determine how many spins based on selected level
        let spinsToAdd = 0;
        if (selectedLevel === 99) spinsToAdd = 3; // Add 3 more spins (total 4)
        else if (selectedLevel === 49) spinsToAdd = 1; // Add 1 more spin (total 2)
        // For level 20, we don't add any extra spins (just the normal 1 spin)

        // Add the extra spins to freeSpinCount
        if (spinsToAdd > 0) {
            setFreeSpinCount(prev => prev + spinsToAdd);
        }

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

    return (
        <div className="Spin-main-container">
            <div className="spin-game-area">
                <div className="main-game-area">
                    <div className="spin-corner-top-bar">
                        <div className="spin-balance-container">
                            Bal:
                            <div className="spin-corner-balance">
                                {balance}
                            </div>
                        </div>
                        <img className="spin-corner-logo" src={spinLogo} alt="spin-logo"/>
                        <div className="Spin-main-settings">
                            {isSettingsToggle ? (
                                <div className="spin-corner-icons"
                                     onClick={() => setIsSettingsToggle(false)}
                                >
                                    ⚙
                                </div>
                            ) : (
                                <div className="spin-corner-icons"
                                     onClick={() => setIsSettingsToggle(true)}
                                >
                                    ⚙
                                </div>
                            )}
                        </div>


                    </div>

                    <Canvas
                        spinState={spinState}
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
            {isSettingsToggle && (
                <GameSettings isOpen={isSettingsToggle} onClose={()=>setIsSettingsToggle(false)}/>
            )}

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