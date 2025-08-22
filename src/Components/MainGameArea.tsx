import {Canvas} from "./Canvas";
import {useEffect, useState} from "react";
import "../assets/maincss.css"
import {SpinControls} from "./SpinControls.tsx";
import type {ColorBlock} from "../Utils/types.ts";

export const MainGameArea = () => {
    const [spinState, setSpinState] = useState<boolean>(false);
    const [winner, setWinner] = useState<ColorBlock | null>(null);
    // const [betAmount,setBetAmount]=useState<number>(20)
    // const [amountWon,setAmountWon]=useState<number>(0)
    // const [active, setActive] = useState<{
    //     range?: string;
    // }>({});
    const [selectedLevel, setSelectedLevel] = useState<number>(99); // default


    const handleSpin = () => {
        if (spinState) return;
        setSpinState(true);


    };

    useEffect(() => {
        if (!winner) return;

        if (winner.amount === "SPIN TENA") {
            console.log("Re-spin triggered!");
            setTimeout(() => {
                setSpinState(true);
            }, 500);
        } else {
            if (spinState) {
                setTimeout(() => {
                    setSpinState(false);
                }, 3500);
            }
        }
    }, [winner, spinState]);


    return (
        <div className="Spin-main-container">
            <div className="spin-game-area">
                <Canvas
                    spinState={spinState}
                    level={selectedLevel}
                    OnSetWinner={setWinner}
                    winner={winner}
                />

                <SpinControls
                    handleSpin={handleSpin}
                    spinState={spinState}
                    // amountWon={amountWon}
                    // OnSetBetAmount={setBetAmount}
                    // betAmount={betAmount}
                    OnSetSelectedLevel={setSelectedLevel}
                    level={selectedLevel}
                />
            </div>
        </div>
    );
};
