import {type Dispatch, type FC, type SetStateAction} from "react";
import {controls} from "../Hooks/useColors.ts";
import BetHistoryTable from "./BetHistoryTable.tsx";

interface SpinControlsProps {
    handleSpin: () => void;
    spinState: boolean;
    OnSetSelectedLevel: Dispatch<SetStateAction<number>>;
    level: number;
    freeSpinCount: number;
}

export const SpinControls: FC<SpinControlsProps> = ({
                                                        handleSpin,
                                                        spinState,
                                                        OnSetSelectedLevel,
                                                        level,
                                                        freeSpinCount
                                                    }) => {
    return (
        <div className="Spin-main-controls">
            <div className="Bet-amount-area-spin ">
                <div className="bet-Amount-text">
                    <div>Bet Amount</div>
                    <div>{level}kes</div>
                </div>
            </div>
            <div className="controls-container">
                <div className="controls-row">
                    {controls.map((btn, i) => {
                        const isActive = level === btn.value;
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    if (!spinState && freeSpinCount === 0) {
                                        OnSetSelectedLevel(btn.value as number);
                                    }
                                }}
                                className={`High-low-btn ${isActive ? "active" : "bg-gray-300"}`}
                            >
                                {{
                                    99: "4 Spins",
                                    49: "2 Spins",
                                    20: "1 Spin"
                                }[btn.label] || ""}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="spin-btn-container">
                <div
                    className="control-spin-btn control-btn-img"
                    onClick={() => {
                        handleSpin();
                    }}
                >
                    {spinState ? "..." : "Spin"}
                </div>
            </div>
            <BetHistoryTable />

        </div>
    );
};
