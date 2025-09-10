export type ColorBlock ={
    id: number;
    amount: string;
    hex: string;
    multiplier:number
}

export type SpinCorner={
    Level:number;
    colorBlock:ColorBlock
}

export type ControlButton = {
    label: string;
    value: number;
};

// every segment is either a number prize or a text prize
export type WheelSegment =
    | { type: "number"; value: number }
    | { type: "text"; value: string };


export type BuySpinsRequest = {
    msisdn: string;         // phone number / player ID
    action: "buyspins";     // only "buyspins" for now
    spins: "1x" | "2x" | "4x"; // could be union if fixed options
    amount: string;         // looks like stringified number (e.g. "99")
};
// Single item in history
export interface BetHistoryResponseItem {
    WinAmount: string;
    msisdn: string;
    createdAt: string; // ISO date string
    OutCome: string | null;
    MatchedNumbers: string | null;
    Prediction: string | null;
    Multiplier: string;
}

// The full response from backend
export interface BetHistoryResponse {
    data: BetHistoryResponseItem[];
    msisdn: string;
}

// What you display in the table
export interface BetHistoryItem {
    id: number;
    betAmount: string;   // e.g. "49 kes"
    spinsUsed: string;   // e.g. "2 Spins"
    result: string;      // e.g. "250"
}

// Request shape when you send for history
export interface BetHistorySendData {
    history: string;  // "1"
    msisdn: string;
}

export type Outcome =
    | {
    kind: "nothing";
    label: string;
}
    | {
    kind: "cash";
    label: string;
    amount: number;
}
    | {
    kind: "bonus";
    label: string;
    bonusSpins: number;
};

export type SpinResult = {
    action: "spinResult";
    msisdn: string;
    purchaseId: string;
    sequence: number;
    outcome: Outcome;
    spinsLeft: number;
    freeSpins: number;
    bonusGrantedSoFar: number;
    Balance: string; // balance comes back as a string
};
