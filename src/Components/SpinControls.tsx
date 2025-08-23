import {type Dispatch, type FC, type SetStateAction} from "react";
import {controls} from "../Hooks/useColors.ts";

interface SpinControlsProps {
    handleSpin: () => void;
    spinState: boolean;
    OnSetSelectedLevel: Dispatch<SetStateAction<number>>;
    level: number;
}

export const SpinControls: FC<SpinControlsProps> = ({
                                                        handleSpin,
                                                        spinState,
                                                        OnSetSelectedLevel,
                                                        level,
                                                    }) => {
    return (
        <div className="Spin-main-controls">
            {/* BET AMOUNT */}
            <div className="Bet-amount-area-spin">



            </div> <div className="Bet-amount-area-spin">
                <div className="bet-Amount-text">
                    <div>Bet Amount</div>
                    <div>{level}kes</div>
                </div>
            </div>

            {/* LEVEL CONTROLS */}
            <div className="controls-container">
                <div className="controls-row">
                    {controls.map((btn, i) => {
                        const isActive = level === btn.value;
                        return (
                            <div
                                key={i}
                                onClick={() => OnSetSelectedLevel(btn.value as number)}
                                className={`High-low-btn ${isActive ? "active" : "bg-gray-300"}`}
                            >
                                {btn.label}kes
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* SPIN BUTTON */}
            <div
                className="control-spin-btn"
                onClick={() => {
                    if (!level) return; // must select level
                    handleSpin();
                }}
            >
                {spinState ? "..." : "Spin"}
            </div>
        </div>
    );
};
