import {Canvas} from "./Canvas";
import {useEffect, useState} from "react";
import "../assets/maincss.css";
import {SpinControls} from "./SpinControls.tsx";
import spinLogo from "../assets/img/scene/spin-corner-logo-1.png";
import {GameSettings} from "./GameSettings.tsx";
import {useSpinAudio} from "../SpinCornerAudio/useSpinAudio.ts";

import type {
    BetHistoryItem,
    BetHistoryResponse,
    BetHistorySendData,
    BuySpinsRequest,
    SpinResult,
    WheelSegment
} from "../Utils/types.ts";

import {SpinCornerSockets} from "../SpinCornerSockets/SpinCornerSockets.ts";

export const MainGameArea = () => {
    const [spinState, setSpinState] = useState<boolean>(false);
    const [selectedLevel, setSelectedLevel] = useState<number>(20);
    const [balance, setBalance] = useState<string | number>("---");
    const [freeSpinCount, setFreeSpinCount] = useState<number>(0);
    const [isPopUp, setIsPopUp] = useState<boolean>(false);
    const [isSettingsToggle, setIsSettingsToggle] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState(false);
    const {connectSocket, sendSpinData, getSocket} = SpinCornerSockets()
    const {playSpinCornerSnd, playSpinWheelLoop} = useSpinAudio(isMuted)
    const [popupKey, setPopupKey] = useState(0);
    const [history, setHistory] = useState<BetHistoryItem[]>([])
    const [resultQueue, setResultQueue] = useState<WheelSegment[]>([]);
    const [currentResult, setCurrentResult] = useState<WheelSegment | null>(null);


    const handleSpin = () => {
        playSpinCornerSnd("BetAmountSnd");
        // const queryParams = new URLSearchParams(window.location.search);
        // const sess = queryParams.get("sess") || " ";
        const sendSData: BuySpinsRequest = {
            msisdn: "254707717501",
            // msisdn: sess,
            action: "buyspins",
            spins: `${selectedLevel === 20 ? "1x" : (selectedLevel === 49 ? "2x" : "4x")}`,
            amount: `${selectedLevel}`
        }
        sendSpinData(sendSData);

        const sendHData: BetHistorySendData = {
            history: "1",
            // msisdn: sess
            msisdn: "254707717501"
        }
        sendSpinData(sendHData);

        // if (spinState) return;
        // if (freeSpinCount > 0) return;
        // spins based on selected level
        let spinsToAdd = 0;
        if (selectedLevel === 99) spinsToAdd = 3; // Add 3 more spins (total 4)
        else if (selectedLevel === 49) spinsToAdd = 1; // Add 1 more spin (total 2)
        // For level 20, we don't add any extra spins (just the normal 1 spin)

        if (spinsToAdd > 0) {
            setFreeSpinCount(prev => prev + spinsToAdd);
        }
    };

    useEffect(() => {
        connectSocket();
        const socket = getSocket();
        if (!socket) return;
        socket.onmessage = (event: MessageEvent<string>) => {
            // console.log("all game response:", event.data);

            try {
                const parsed = JSON.parse(event.data);

                if (Array.isArray(parsed.data)) {
                    // ✅ History response
                    const historyData: BetHistoryResponse = parsed;

                    // Transform backend data → table items
                    const tableData: BetHistoryItem[] = historyData.data.map((item, index) => ({
                        id: index + 1,
                        betAmount: `${item.Multiplier}x`, // or map from your logic
                        spinsUsed: "1 Spin",             // you can infer from Multiplier
                        result: item.WinAmount
                    }));

                    setHistory(tableData);
                    return;
                }
                const data: SpinResult = JSON.parse(event.data);
                // console.log("Game response:", data);
                const outcome: WheelSegment =
                    data.outcome.kind === "cash"
                        ? {type: "number", value: data.outcome.amount}
                        : {type: "text", value: data.outcome.label};

                // Add result to queue
                setResultQueue(prev => [...prev, outcome]);
                const spinDuration = 5000; // match your wheel animation time
                setTimeout(() => {
                    setBalance(Number(data.Balance));
                }, spinDuration); // now popup waits for spin to visually end

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                // console.error("Error parsing server message:", err);
            }
        };

    }, [connectSocket, freeSpinCount, getSocket, playSpinCornerSnd]);
    // Spin end handler
    useEffect(() => {
        if (spinState) {
            const spinDuration = 5000;
            playSpinWheelLoop(3500);
            const timer = setTimeout(() => {
                setSpinState(false);
            }, spinDuration); // spin duration
            return () => clearTimeout(timer);
        }
    }, [playSpinCornerSnd, playSpinWheelLoop, spinState]);

    useEffect(() => {

        if (!currentResult) return;
        let freeSpinsToAdd = 0;
        if (currentResult.type == "text") {

            switch (currentResult.value) {
                case "Zako 2":
                    freeSpinsToAdd = 2;
                    break;
                case "Zako 3":
                    freeSpinsToAdd = 3;
                    break;
                case "SPIN TENA":
                    freeSpinsToAdd = 1;
                    break;
            }
        }

        if (freeSpinsToAdd > 0) {
            setFreeSpinCount(prev => prev + freeSpinsToAdd);
        }

    }, [currentResult]);


    useEffect(() => {
        if (spinState || resultQueue.length === 0) return;
        // Take the next result from queue
        const [nextResult, ...rest] = resultQueue;
        setResultQueue(rest);
        setCurrentResult(nextResult);

        // Start spinning
        setSpinState(true);
        const spinDuration = 4550;   // wheel animation
        const popupDuration = 1000;  // how long popup stays visible
        const buffer = 350;          // small gap before next spin
        const totalCycle = spinDuration + popupDuration + buffer;

        // 1. End spin after animation
        setTimeout(() => {
            setSpinState(false);
            setFreeSpinCount(prev => Math.max(0, prev - 1));

            // 2. Play sound + show popup
            if (nextResult.type === "text" && nextResult.value === "Nunge Tosha") {
                playSpinCornerSnd("popUpLose");
            } else if (nextResult.type === "text" && nextResult.value === "Zako 2" ||
                nextResult.type === "text" && nextResult.value === "Zako 3" ||
                nextResult.type === "text" && nextResult.value === "SPIN TENA"
            ) {
                playSpinCornerSnd("BonusWinSnd");
            } else {
                playSpinCornerSnd("popUpWin");

            }
            setPopupKey(prev => prev + 1);
            setIsPopUp(true);

            // 3. Hide popup after popupDuration
            setTimeout(() => {
                setIsPopUp(false);
            }, popupDuration);

        }, spinDuration);

        // 4. Wait for full cycle before moving to the next spin
        const nextSpinTimer = setTimeout(() => {
            // This useEffect will rerun automatically if resultQueue still has items
        }, totalCycle);

        return () => clearTimeout(nextSpinTimer);

    }, [resultQueue, spinState, playSpinCornerSnd]);


    return (
        <div className="Spin-main-container">
            <div className="spin-game-area">
                <div className="main-game-area">
                    <div className="spin-corner-top-bar">
                        <div className="balance">
                            Bal:
                            <div className="balance-amount">
                                {balance === "---" ? (
                                    <div className="balance-loader">
                                        <div className="balance-progress"></div>
                                    </div>
                                ) : (
                                    <div className="spin-corner-balance">
                                        {typeof balance === "number" ? balance.toFixed(1) : balance}
                                    </div>
                                )}
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
                    winner={currentResult}
                    freeSpinCount={freeSpinCount}
                />

                <SpinControls
                    freeSpinCount={freeSpinCount}
                    handleSpin={handleSpin}
                    spinState={spinState}
                    OnSetSelectedLevel={setSelectedLevel}
                    level={selectedLevel}
                    history={history}
                />
            </div>
        </div>

    {
        isSettingsToggle && (
            <GameSettings
                isOpen={isSettingsToggle}
                onClose={() => setIsSettingsToggle(false)}
                OnSetIsMuted={setIsMuted}
                isMuted={isMuted}
            />
        )
    }

    {
        isPopUp && (
            <>

                {currentResult && (
                    <div className="popup" key={popupKey}
                         style={{
                             border: `${currentResult.type === "text" && currentResult.value === "Nunge Tosha" ? (
                                 "2px solid red"
                             ) : (
                                 "2px solid #FFD700"
                             )}`,
                             boxShadow: `${currentResult.type === "text" && currentResult.value === "Nunge Tosha" ? (
                                 "0 0 20px red"
                             ) : (
                                 "0 0 20px rgba(255, 215, 0, 0.3)"
                             )}`


                         }}
                    >

                        <div className="pop-container">
                            {/* Win/Loss header */}
                            {currentResult.type === "text" && currentResult.value === "Nunge Tosha" ? (
                                <>
                                    <div className="three-d-text-lost">You Lost!</div>
                                    {currentResult.type === "text" && currentResult.value === "Nunge Tosha" && (
                                        <div className="amount-won">Try Again</div>
                                    )}
                                </>

                            ) : (
                                <>
                                    <div className="three-d-text-win">You Won!</div>
                                    {/*Bonus / Cash amounts */}
                                    {currentResult.type === "text" && currentResult.value === "SPIN TENA" && (
                                        <div className="amount-won"> 1 free spin! </div>
                                    )}
                                    {currentResult.type === "text" && currentResult.value === "Zako 2" && (
                                        <div className="amount-won"> 2 free spins! </div>
                                    )}
                                    {currentResult.type === "text" && currentResult.value === "Zako 3" && (
                                        <div className="amount-won"> 3 free spins! </div>
                                    )}
                                    {currentResult.type === "text" && currentResult.value === "Gonga 25K" && (
                                        <div className="amount-won"> 25,000kes </div>
                                    )}

                                    {currentResult.type === "number" && (

                                        <div className="amount-won">{currentResult.value}kes</div>
                                    )}

                                </>
                            )}
                        </div>


                    </div>
                )}
            </>
        )
    }
</div>
)
    ;
};