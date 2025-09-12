// GameSettings.tsx
import {type Dispatch, type SetStateAction, useState} from "react";

interface GameSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    OnSetIsMuted:Dispatch<SetStateAction<boolean>>;
    isMuted:boolean;
}
    // const [winner, setWinner] = useState<WheelSegment | null>(null);

export const GameSettings = ({isOpen, onClose,OnSetIsMuted,isMuted}: GameSettingsProps) => {
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    const toggleMute = () => {
        OnSetIsMuted(!isMuted);
        // Add your sound mute/unmute logic here
    };

    return (
        <>
            {isOpen && (
                <div className="settings-overlay" onClick={onClose}>
                    <div className="settings-container" onClick={(e) => e.stopPropagation()}>
                        <div className="settings-header">
                            <h2>Game Settings</h2>
                            <button className="settings-close-btn" onClick={onClose}>
                                ×
                            </button>
                        </div>

                        <div className="settings-content">
                            <div className="settings-item">
                                <span>Sound</span>
                                <div
                                    className={`sound-toggle ${isMuted ? 'muted' : 'unmuted'}`}
                                    onClick={toggleMute}
                                >
                                    <div className="toggle-slider"></div>
                                </div>
                            </div>

                            <div className="settings-item">
                                <button
                                    className="how-to-play-btn"
                                    onClick={() => setShowHowToPlay(true)}
                                >
                                    How to Play
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showHowToPlay && (
                <div className="how-to-play-overlay" onClick={() => setShowHowToPlay(false)}>
                    <div className="how-to-play-content" onClick={(e) => e.stopPropagation()}>
                        <div className="how-to-play-header">
                            <h2>How to Play Spin Corner</h2>
                            <button className="settings-close-btn" onClick={() => setShowHowToPlay(false)}>
                                ×
                            </button>
                        </div>
                        <div className="how-to-play-body">
                            <div className="how-to-play-section">
                                <h3>Getting Started</h3>
                                <div className="instruction-step">
                                    <span className="step-number">1</span>
                                    <div className="step-content">
                                        <p>Choose your bet option:</p>
                                        <ul className="bet-options">
                                            <li><strong>1 Spin</strong> - 20 KES</li>
                                            <li><strong>2 Spins</strong> - 49 KES</li>
                                            <li><strong>4 Spins</strong> - 99 KES</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="instruction-step">
                                    <span className="step-number">2</span>
                                    <p>Higher bets give you better value with more spins for your money</p>
                                </div>
                                <div className="instruction-step">
                                    <span className="step-number">3</span>
                                    <p>Click the <strong>SPIN</strong> button to set the wheel in motion</p>
                                </div>
                            </div>

                            <div className="how-to-play-section">
                                <h3>Winning Prizes</h3>
                                <p>The wheel contains various winning segments with different prizes:</p>
                                <ul className="prize-list">
                                    <li><span className="prize-amount">Cash prizes</span> from 50 KES to 25,000 KES</li>
                                    <li><span className="prize-amount">Free spins</span> - SPIN TENA (1 spin), Zako 2 (2 spins), Zako 3 (3 spins)</li>
                                    <li><span className="prize-amount">Big bonuses</span> - 25K and 7,500 prizes</li>
                                    <li><span className="prize-amount">Try again</span> - "Nunge Tosha" means no win this time</li>
                                </ul>
                            </div>

                            <div className="how-to-play-section">
                                <h3>Game Features</h3>
                                <ul className="feature-list">
                                    <li>Free spins automatically play after your current spin finishes</li>
                                    <li>Your balance updates instantly with each win</li>
                                    <li>View your bet history to track previous games</li>
                                </ul>
                            </div>

                            <div className="how-to-play-tip">
                                <strong>Pro Tip:</strong> The 4-spin option gives you the best value with more chances to win!
                            </div>
                        </div>
                    </div>
                </div>
                // <div className="how-to-play-overlay" onClick={() => setShowHowToPlay(false)}>
                //     <div className="how-to-play-content" onClick={(e) => e.stopPropagation()}>
                //         <div className="how-to-play-header">
                //             <h2>How to Play Spin Corner</h2>
                //             <button className="settings-close-btn" onClick={() => setShowHowToPlay(false)}>
                //                 ×
                //             </button>
                //         </div>
                //         <div className="how-to-play-body">
                //             <div className="how-to-play-section">
                //                 <h3>Getting Started</h3>
                //                 <div className="instruction-step">
                //                     <span className="step-number">1</span>
                //                     <p>Choose your bet option:</p>
                //                     <ul className="bet-options">
                //                         <li><strong>1 Spin</strong> - 20 KES</li>
                //                         <li><strong>2 Spins</strong> - 49 KES</li>
                //                         <li><strong>4 Spins</strong> - 99 KES</li>
                //                     </ul>
                //                 </div>
                //                 <div className="instruction-step">
                //                     <span className="step-number">2</span>
                //                     <p>Higher bets give you better value with more spins for your money</p>
                //                 </div>
                //                 <div className="instruction-step">
                //                     <span className="step-number">3</span>
                //                     <p>Click the <strong>SPIN</strong> button to set the wheel in motion</p>
                //                 </div>
                //             </div>
                //
                //             <div className="how-to-play-section">
                //                 <h3>Winning Prizes</h3>
                //                 <p>Match symbols to win cash prizes from 50 KES to 25,000 KES</p>
                //                 <p>Special symbols trigger free spins: SPIN TENA (1 free spin), Zako 2 (2 free spins), Zako 3 (3 free spins)</p>
                //                 <p>Watch for Gonga bonuses: 3K, 10K, and 25K prizes</p>
                //                 <p>If you land on "Nunge Tosha," you don't win anything but can try again</p>
                //             </div>
                //
                //             <div className="how-to-play-section">
                //                 <h3>Game Features</h3>
                //                 <p> Free spins are automatically used after your current spin finishes</p>
                //                 <p> Your balance updates automatically with each win</p>
                //                 <p>Bet history is available to track your previous games</p>
                //             </div>
                //
                //             <div className="how-to-play-tip">
                //                 <strong>Tip:</strong> Higher bets give you more chances to win with additional spins!
                //             </div>
                //         </div>
                //     </div>
                // </div>
            )}
        </>
    );
};