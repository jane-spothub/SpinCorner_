import {Canvas} from "./Canvas";
import {useEffect, useState} from "react";
import "../assets/maincss.css"
import {SpinControls} from "./SpinControls.tsx";
import type {ColorBlock} from "../Utils/types.ts";

export const MainGameArea = () => {
    const [spinState, setSpinState] = useState<boolean>(false);
    const [winner, setWinner] = useState<ColorBlock | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number>(99); // default
    const [freeSpinCount, setFreeSpinCount] = useState<number>(0); // new
    const [isFreeSpin, setIsFreeSpin] = useState(false);
    const [isPopUp,setIsPopUp]=useState<boolean>(false)
    const handleSpin = () => {
        if (spinState) return;
        setSpinState(true);
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
                setFreeSpinCount(prev => prev - 1); // decrement first
                setIsFreeSpin(true); // mark as free
                setSpinState(true);  // trigger next spin
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [spinState, freeSpinCount]);

// Award free spins (only if it was NOT a free spin)
    useEffect(() => {
        if (!spinState && winner && !isFreeSpin) {
            let freeSpinsToAdd = 0;

            switch (winner.amount) {
                case "SPIN TENA": freeSpinsToAdd = 1; break;
                case "Zako 2": freeSpinsToAdd = 2; break;
                case "Zako 3": freeSpinsToAdd = 3; break;
            }

            if (freeSpinsToAdd > 0) {
                setFreeSpinCount(prev => prev + freeSpinsToAdd);
            }
        }

        // reset flag after every spin
        if (!spinState) {
            setIsFreeSpin(false);
        }
    }, [spinState, winner, isFreeSpin]);

    return (
        <div className="Spin-main-container">
            <div className="spin-game-area">
                <Canvas
                    spinState={spinState}
                    level={selectedLevel}
                    OnSetWinner={setWinner}
                    freeSpinCount={freeSpinCount}
                />

                <SpinControls
                    handleSpin={handleSpin}
                    spinState={spinState}
                    OnSetSelectedLevel={setSelectedLevel}
                    level={selectedLevel}
                />
            </div>

            {/* Popup */}
            {isPopUp &&(
                <div className="popup">
                    {winner && (
                        <>
                            {winner.amount === "SPIN TENA" && (
                                <div>You have won 1 free spin!</div>
                            )}
                            {winner.amount === "Zako 2" && (
                                <div>You have won 2 free spins!</div>
                            )}
                            {winner.amount === "Zako 3" && (
                                <div>You have won 3 free spins!</div>
                            )}
                            {winner.amount !== "SPIN TENA" &&
                                winner.amount !== "Zako 2" &&
                                winner.amount !== "Nunge Tosha" &&
                                winner.amount !== "Zako 3" &&
                                winner.amount !== "Gonga 3K" &&
                                winner.amount !== "Gonga 10K" &&
                                winner.amount !== "Gonga 25K" &&
                                (
                                    <div>You have won {winner.amount}kes</div>
                                )}
                            {winner.amount === "Nunge Tosha" && (
                                <div>You have won 0kes ! try again</div>
                            )}
                            {winner.amount === "Gonga 3K" && (
                                <div>You have won 3,000kes</div>
                            )}
                            {winner.amount === "Gonga 10K" && (
                                <div>You have won 10,000kes</div>
                            )}
                            {winner.amount === "Gonga 25K" && (
                                <div>You have won 25,000kes</div>
                            )}

                        </>
                    )}
                </div>
            )}

        </div>
    );
};
