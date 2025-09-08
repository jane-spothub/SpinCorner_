import {type Dispatch, type FC, type SetStateAction} from "react";
import {controls} from "../Hooks/useColors.ts";
import BetHistoryTable from "./BetHistoryTable.tsx";
import { toast } from "react-toastify";

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
                    <div >Bet</div>
                    <div className="spins-value">  {level===20? "1 Spin":(level===49?"2 Spins":"4 Spins")}                </div>

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
                                    20: "1 Spin",
                                    49: "2 Spins",
                                    99: "4 Spins"
                                }[btn.label] || ""}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="spin-btn-container">
                <div
                    className={`control-spin-btn ${spinState ? "active-spin":""}`}
                    onClick={() => {
                        if (spinState && freeSpinCount> 0) {
                            toast.info("Spin ongoing, please wait!");

                            return;
                        }else{
                            handleSpin();

                        }
                    }}
                >
                    {spinState ? "Spin" : "Spin"}
                </div>
            </div>
            <BetHistoryTable />

        </div>
    );
};
