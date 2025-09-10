import type {BetHistoryItem} from "../Utils/types.ts";

interface Props {
    history: BetHistoryItem[];
}

export const BetHistoryTable = ({history}: Props) => {
    const getResultStyle = (result: string) => {
        if (result === "0") return {color: "#e53e3e", fontWeight: "bold"};
        if (result.includes("K") || !isNaN(Number(result))) return {color: "#ffdd00", fontWeight: "bold"};
        if (result === "1 Free Spin") return {color: "#4fd1c5", fontWeight: "bold"};
        if (result === "2 Free Spins") return {color: "#4fd1c5", fontWeight: "bold"};
        if (result === "3 Free Spins") return {color: "#4fd1c5", fontWeight: "bold"};
        if (result.includes("Gonga")) return {color: "#6ffd00", fontWeight: "bold"};
        return {color: "#e2e8f0"};
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
            case "x":
                return "20 kes";
            default:
                return betAmount; // fallback if something else comes
        }
    };
    if (history.length === 0) {
        return (
            <div className="bet-history-container">
                <h2 className="bet-title">Bet History</h2>
                <table className="bet-history-spin">
                    <thead>
                    <tr style={{background: "#202733"}}>
                        <th className="history-bet-titles">Bet Amount</th>
                        <th className="history-bet-titles">Result</th>
                    </tr>
                    </thead>
                    <tr>
                        <tbody>

                        </tbody>
                    </tr>


                </table>
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Loading data...</p>
                </div>
            </div>
        );
    } else {

        return (
            <div className="bet-history-container">
                <h2 className="bet-title">Bet History</h2>
                <table className="bet-history-spin">
                    <thead>
                    <tr style={{background: "#202733"}}>
                        <th className="history-bet-titles">Bet Amount</th>
                        <th className="history-bet-titles">Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((item, index) => {
                        const result = item.result === "Nunge Tosha" ? "0"
                            : (item.result === "SPIN TENA" ? "1 Free Spin"
                                : (item.result === "Zako 3" ? "3 Free Spins" :
                                    (item.result === "Zako 2" ? "2 Free Spins"
                                        : item.result)));
                        return (
                            <tr
                                key={item.id}
                                style={{background: index % 2 === 0 ? "#080a0e" : "#191f2a"}}
                            >
                                <td className="bet-item">{formatBetAmount(item.betAmount)}</td>
                                <td className="bet-item" style={{...getResultStyle(result)}}
                                >
                                    {result}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
};

