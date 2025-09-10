import type { BetHistoryItem } from "../Utils/types.ts";

interface Props {
    history: BetHistoryItem[];
}

export const BetHistoryTable = ({ history }: Props) => {
    const getResultStyle = (result: string) => {
        if (result === "0") return { color: "#e53e3e", fontWeight: "bold" };
        if (result.includes("K") || !isNaN(Number(result))) return { color: "#ffaf00", fontWeight: "bold" };
        if (result.includes("7,500")) return { color: "#4fd1c5", fontWeight: "bold" };
        if (result.includes("Gonga")) return { color: "#6ffd00", fontWeight: "bold" };
        return { color: "#e2e8f0" };
    };

    // 👇 Map multiplier strings to kes
    const formatBetAmount = (betAmount: string) => {
        switch (betAmount) {
            case "1x":
                return "20 kes";
            case "2x":
                return "49 kes";
            case "4x":
                return "99 kes";
            default:
                return betAmount; // fallback if something else comes
        }
    };

    return (
        <div className="bet-history-container">
            <h2 className="bet-title">Bet History</h2>
            <table className="bet-history-spin">
                <thead>
                <tr style={{ background: "#202733" }}>
                    <th className="history-bet-titles">Bet Amount</th>
                    <th className="history-bet-titles">Spins Used</th>
                    <th className="history-bet-titles">Result</th>
                </tr>
                </thead>
                <tbody>
                {history.map((item, index) => (
                    <tr
                        key={item.id}
                        style={{ background: index % 2 === 0 ? "#080a0e" : "#191f2a" }}
                    >
                        <td className="bet-item">{formatBetAmount(item.betAmount)}</td>
                        <td className="bet-item">{item.spinsUsed}</td>
                        <td className="bet-item" style={{ ...getResultStyle(item.result) }}>
                            {item.result}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
