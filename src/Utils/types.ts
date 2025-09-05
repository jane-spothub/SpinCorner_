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
