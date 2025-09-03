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
        <div style={{ padding: "1px", background: "rgba(26,32,44,0.32)", borderRadius: "8px" }}>
            <h2 style={{
                color: "#ecc94b",
                textAlign: "center",
                marginBottom: "10px",
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                fontSize: "1.5rem"
            }}>
                Bet History
            </h2>
            <table className="bet-history-spin" style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#2d3748",
                borderRadius: "6px",
                overflow: "hidden",
                color:"white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <thead>
                <tr style={{ background: "#2c5282" }}>
                    <th style={{
                        border: "1px solid #4a5568",
                        padding: "12px",
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "0 1px 1px rgba(0,0,0,0.3)"
                    }}>
                        Bet Amount
                    </th>
                    <th style={{
                        border: "1px solid #4a5568",
                        padding: "12px",
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "0 1px 1px rgba(0,0,0,0.3)"
                    }}>
                        Spins Used
                    </th>
                    <th style={{
                        border: "1px solid #4a5568",
                        padding: "12px",
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "0 1px 1px rgba(0,0,0,0.3)"
                    }}>
                        Result
                    </th>
                </tr>
                </thead>
                <tbody>
                {dummyData.map((item, index) => (
                    <tr key={item.id} style={{
                        background: index % 2 === 0 ? "#2d3748" : "#344155"
                    }}>
                        <td style={{
                            border: "1px solid #4a5568",
                            padding: "10px",
                            textAlign: "center"
                        }}>
                            {item.betAmount}
                        </td>
                        <td style={{
                            border: "1px solid #4a5568",
                            padding: "10px",
                            textAlign: "center"
                        }}>
                            {item.spinsUsed}
                        </td>
                        <td style={{
                            border: "1px solid #4a5568",
                            padding: "10px",
                            textAlign: "center",
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