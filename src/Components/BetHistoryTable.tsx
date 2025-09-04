import React from "react";

interface BetHistoryItem {
    id: number;
    betAmount: string;
    spinsUsed: string;
    result: string;
}

const dummyData: BetHistoryItem[] = [
    { id: 1, betAmount: "49 kes", spinsUsed: "2 Spin", result: "250" },
    { id: 3, betAmount: "99 kes", spinsUsed: "4 Spins", result: "3K" },
    { id: 4, betAmount: "20 kes", spinsUsed: "1 Spin", result: "50" },
    { id: 5, betAmount: "99 kes", spinsUsed: "4 Spins", result: "7,500" },
];

export const BetHistoryTable: React.FC = () => {
    // Function to determine result styling
    const getResultStyle = (result: string) => {
        if (result === "0") {
            return { color: "#e53e3e", fontWeight: "bold" }; // Loss
        } else if (result.includes("K") || !isNaN(Number(result))) {
            return { color: "#38a169", fontWeight: "bold" }; // Win with amount
        } else if (result.includes("7,500")) {
            return { color: "#4fd1c5", fontWeight: "bold" }; // Free spins
        } else if (result.includes("Gonga")) {
            return { color: "#68d391", fontWeight: "bold" }; // Big win
        }
        return { color: "#e2e8f0" }; // Default
    };

    return (
        <div
            className="bet-history-container">
            <h2 className="bet-title">
                Bet History
            </h2>
            <table className="bet-history-spin" >
                <thead>
                <tr style={{ background: "#202733" }}>
                    <th className="history-bet-amount">
                        Bet Amount
                    </th>
                    <th className="history-spins-used" >
                        Spins Used
                    </th>
                    <th className="history-result" >
                        Result
                    </th>
                </tr>
                </thead>
                <tbody>
                {dummyData.map((item, index) => (
                    <tr key={item.id} style={{
                        background: index % 2 === 0 ? "#080a0e" : "#191f2a"
                    }}>
                        <td
                            className="bet-item" >
                            {item.betAmount}
                        </td>
                        <td className="bet-item" >
                            {item.spinsUsed}
                        </td>
                        <td className="bet-item"
                            style={{
                            ...getResultStyle(item.result)
                        }}>
                            {item.result}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BetHistoryTable;