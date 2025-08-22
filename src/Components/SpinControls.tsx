import { type Dispatch, type FC, type SetStateAction } from "react";
import { controls } from "../Hooks/useColors.ts";
import betChip from "../assets/img/scene/bet-amount.png";
import betChipSelected from "../assets/img/scene/bet-amount-selected.png";

interface SpinControlsProps {
    handleSpin: () => void;
    spinState: boolean;
    amountWon: number;
    betAmount: number;
    OnSetBetAmount: Dispatch<SetStateAction<number>>;
    OnSetSelectedLevel: Dispatch<SetStateAction<number>>;
    level: number;
}

export const SpinControls: FC<SpinControlsProps> = ({
                                                        handleSpin,
                                                        spinState,
                                                        betAmount,
                                                        OnSetBetAmount,
                                                        amountWon,
                                                        OnSetSelectedLevel,
                                                        level,
                                                    }) => {
    return (
        <div className="Spin-main-controls">
            {/* BET AMOUNT */}
            <div className="Bet-amount-area-spin">
                <div className="bet-Amount-text">
                    {/*<div>Bet Amount</div>*/}
                    {/*<div>{betAmount}</div>*/}
                    {/*<div>Amount Won</div>*/}
                    {/*<div>{amountWon}</div>*/}
                    <div>Level</div>
                    <div>{level}</div>
                </div>

                {/*<div className="Bet-spin-area">*/}
                {/*    <div className="spin-short-bet">*/}
                {/*        {[20, 50, 100, 150, 250, 500].map((amount) => (*/}
                {/*            <div*/}
                {/*                className="bet-short-spin"*/}
                {/*                key={amount}*/}
                {/*                onClick={() => OnSetBetAmount(amount)}*/}
                {/*            >*/}
                {/*                {betAmount === amount ? (*/}
                {/*                    <img src={betChipSelected} alt="chip" className="chip-image" />*/}
                {/*                ) : (*/}
                {/*                    <img src={betChip} alt="chip" className="chip-image" />*/}
                {/*                )}*/}
                {/*                <span className="chip-text">{amount}</span>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
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
                                {btn.label}
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
